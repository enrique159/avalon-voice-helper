import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { ScriptStep } from '../data/avalon';

export interface NarrationSettings {
  voiceURI: string;
  rate: number;
  intervalSeconds: number;
  tickDuringPauses: boolean;
}

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

export function useSpeechNarrator(getSteps: () => ScriptStep[], settings: NarrationSettings) {
  const voices = ref<SpeechSynthesisVoice[]>([]);
  const currentIndex = ref(0);
  const isPlaying = ref(false);
  const unsupported = ref(false);
  let playbackToken = 0;
  let audioContext: AudioContext | undefined;

  const selectedVoice = computed(() => voices.value.find((voice) => voice.voiceURI === settings.voiceURI));

  const ensureAudioContext = async () => {
    const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContextConstructor) {
      return undefined;
    }

    audioContext ??= new AudioContextConstructor();
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    return audioContext;
  };

  const playTick = async () => {
    const context = await ensureAudioContext();
    if (!context) {
      return;
    }

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  };

  const waitBetweenSteps = async (seconds: number, token: number) => {
    for (let remaining = seconds; remaining > 0; remaining -= 1) {
      if (token !== playbackToken) {
        return;
      }

      if (settings.tickDuringPauses) {
        await playTick();
      }

      await wait(1000);
    }
  };

  const loadVoices = () => {
    if (!('speechSynthesis' in window)) {
      unsupported.value = true;
      return;
    }

    const availableVoices = window.speechSynthesis.getVoices();
    const spanishVoices = availableVoices.filter((voice) => voice.lang.toLowerCase().startsWith('es'));
    voices.value = (spanishVoices.length > 0 ? spanishVoices : availableVoices).sort(
      (a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name)
    );

    if (!settings.voiceURI && voices.value.length > 0) {
      settings.voiceURI = voices.value[0].voiceURI;
    }
  };

  const speak = (text: string, token: number) =>
    new Promise<void>((resolve) => {
      if (unsupported.value || token !== playbackToken) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedVoice.value?.lang ?? 'es-ES';
      utterance.rate = settings.rate;
      utterance.pitch = 0.92;
      utterance.voice = selectedVoice.value ?? null;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });

  const playFrom = async (index = currentIndex.value) => {
    if (unsupported.value || isPlaying.value) {
      return;
    }

    const steps = getSteps();
    if (steps.length === 0) {
      return;
    }

    playbackToken += 1;
    const token = playbackToken;
    isPlaying.value = true;

    for (let stepIndex = index; stepIndex < steps.length; stepIndex += 1) {
      if (token !== playbackToken) {
        break;
      }

      currentIndex.value = stepIndex;
      await speak(steps[stepIndex].text, token);

      if (token === playbackToken && stepIndex < steps.length - 1) {
        await waitBetweenSteps(settings.intervalSeconds, token);
      }
    }

    if (token === playbackToken) {
      isPlaying.value = false;
    }
  };

  const stop = () => {
    playbackToken += 1;
    isPlaying.value = false;
    window.speechSynthesis?.cancel();
  };

  const preview = async (text: string) => {
    stop();
    await playCustomText(text);
  };

  const playCustomText = async (text: string) => {
    if (unsupported.value) {
      return;
    }

    playbackToken += 1;
    const token = playbackToken;
    isPlaying.value = true;
    await speak(text, token);

    if (token === playbackToken) {
      isPlaying.value = false;
    }
  };

  onMounted(() => {
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  });

  onBeforeUnmount(stop);

  return {
    voices,
    currentIndex,
    isPlaying,
    unsupported,
    loadVoices,
    playFrom,
    preview,
    stop
  };
}
