<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import AppHero from './components/AppHero.vue';
import DeckSummary from './components/DeckSummary.vue';
import NarrationBar from './components/NarrationBar.vue';
import NarrationLocaleSection from './components/NarrationLocaleSection.vue';
import NarrationModeSection from './components/NarrationModeSection.vue';
import PlayerCountSection from './components/PlayerCountSection.vue';
import QuestReference from './components/QuestReference.vue';
import RolesSection, { type RoleOptionView } from './components/RolesSection.vue';
import ScriptStepsSection from './components/ScriptStepsSection.vue';
import VoiceControls from './components/VoiceControls.vue';
import { useSpeechNarrator } from './composables/useSpeechNarrator';
import {
  buildDeck,
  buildOpeningScript,
  optionalRoles,
  playerDistribution,
  questTeamSizes,
  roles,
  type NarrationMode,
  type PlayerCount,
  type Translate,
  type RoleId
} from './data/avalon';
import { defaultLocale } from './i18n';
import type { SupportedLocale } from './i18n/messages';

interface StoredSettings {
  playerCount: PlayerCount;
  selectedRoles: RoleId[];
  voiceURI: string;
  rate: number;
  intervalSeconds: number;
  tickDuringPauses: boolean;
  narrationMode: NarrationMode;
  narrationLocale: SupportedLocale;
}

const storageKey = 'avalon-voice-settings';
const playerCounts: PlayerCount[] = [5, 6, 7, 8, 9, 10];

const loadSettings = (): StoredSettings => {
  const fallback: StoredSettings = {
    playerCount: 5,
    selectedRoles: ['percival', 'morgana'],
    voiceURI: '',
    rate: 0.92,
    intervalSeconds: 3,
    tickDuringPauses: true,
    narrationMode: 'original',
    narrationLocale: defaultLocale
  };

  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? { ...fallback, ...JSON.parse(saved) } : fallback;
  } catch {
    return fallback;
  }
};

const settings = reactive<StoredSettings>(loadSettings());
const { t, locale } = useI18n();
locale.value = settings.narrationLocale;

const deck = computed(() => buildDeck(settings.playerCount, settings.selectedRoles));
const translate: Translate = (key, values) => t(key, values ?? {});
const scriptSteps = computed(() => buildOpeningScript(settings.selectedRoles, settings.narrationMode, translate));
const distribution = computed(() => playerDistribution[settings.playerCount]);
const selectedRoleSet = computed(() => new Set<RoleId>(settings.selectedRoles));
const questSizes = computed(() => questTeamSizes[settings.playerCount]);

const {
  voices,
  currentIndex,
  isPlaying,
  unsupported,
  playFrom,
  preview,
  stop
} = useSpeechNarrator(() => scriptSteps.value, settings);

const selectableRoleIds = computed(() => optionalRoles.map((role) => role.id));
const selectedGoodOptionals = computed(
  () => optionalRoles.filter((role) => role.allegiance === 'good' && selectedRoleSet.value.has(role.id)).length
);
const selectedEvilOptionals = computed(
  () => optionalRoles.filter((role) => role.allegiance === 'evil' && selectedRoleSet.value.has(role.id)).length
);

const canToggleRole = (roleId: RoleId) => {
  const role = optionalRoles.find((item) => item.id === roleId);
  if (!role || selectedRoleSet.value.has(roleId)) {
    return true;
  }

  if (role.allegiance === 'good') {
    return selectedGoodOptionals.value < distribution.value.good - 1;
  }

  return selectedEvilOptionals.value < distribution.value.evil - 1;
};

const roleOptions = computed<RoleOptionView[]>(() =>
  roles.map((role) => ({
    id: role.id,
    name: role.name,
    allegiance: role.allegiance,
    summary: role.summary,
    imageSrc: `/characters/${role.id}.png`,
    selected: !role.required && selectedRoleSet.value.has(role.id),
    disabled: role.required || !canToggleRole(role.id),
    required: role.required
  }))
);

const toggleRole = (roleId: RoleId) => {
  if (!canToggleRole(roleId)) {
    return;
  }

  stop();
  if (selectedRoleSet.value.has(roleId)) {
    settings.selectedRoles = settings.selectedRoles.filter((id) => id !== roleId);
    return;
  }

  settings.selectedRoles = [...settings.selectedRoles, roleId].filter((id) => selectableRoleIds.value.includes(id));
};

const updatePlayerCount = (count: PlayerCount) => {
  stop();
  settings.playerCount = count;

  while (!deck.value.isValid) {
    const allegianceToTrim = deck.value.loyalServants < 0 ? 'good' : 'evil';
    const lastOptional = [...settings.selectedRoles].reverse().find((roleId) => {
      const role = optionalRoles.find((item) => item.id === roleId);
      return role?.allegiance === allegianceToTrim;
    });

    if (!lastOptional) {
      break;
    }

    settings.selectedRoles = settings.selectedRoles.filter((roleId) => roleId !== lastOptional);
  }
};

const updateNarrationMode = (mode: NarrationMode) => {
  stop();
  settings.narrationMode = mode;
};

const updateNarrationLocale = (nextLocale: SupportedLocale) => {
  stop();
  settings.narrationLocale = nextLocale;
  locale.value = nextLocale;
};

const previewVoice = () => {
  void preview(t('narration.preview'));
};

const warning = computed(() => {
  const needsFivePlayerBalance =
    settings.playerCount === 5 &&
    selectedRoleSet.value.has('percival') &&
    !selectedRoleSet.value.has('mordred') &&
    !selectedRoleSet.value.has('morgana');

  if (needsFivePlayerBalance) {
    return 'Regla sugerida: con 5 jugadores y Perceval, añade Mordred o Morgana para equilibrar la partida.';
  }

  if (!deck.value.isValid) {
    return 'La selección excede los espacios disponibles para el número de jugadores.';
  }

  return '';
});

watch(
  settings,
  (value) => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  },
  { deep: true }
);
</script>

<template>
  <main class="min-h-dvh bg-[radial-gradient(circle_at_50%_-10%,#173e70_0%,#07111f_42%,#04070d_100%)] text-slate-100">
    <section class="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-28 pt-[max(1rem,env(safe-area-inset-top))]">
      <AppHero />

      <PlayerCountSection
        :player-counts="playerCounts"
        :player-count="settings.playerCount"
        :distribution="distribution"
        @update:player-count="updatePlayerCount"
      />

      <RolesSection :roles="roleOptions" :warning="warning" @toggle-role="toggleRole" />

      <DeckSummary :deck="deck" />

      <NarrationLocaleSection :locale="settings.narrationLocale" @update:locale="updateNarrationLocale" />

      <NarrationModeSection :mode="settings.narrationMode" @update:mode="updateNarrationMode" />

      <VoiceControls
        :voices="voices"
        :selected-voice-uri="settings.voiceURI"
        :rate="settings.rate"
        :interval-seconds="settings.intervalSeconds"
        :tick-during-pauses="settings.tickDuringPauses"
        :unsupported="unsupported"
        @update:selected-voice-uri="settings.voiceURI = $event"
        @update:rate="settings.rate = $event"
        @update:interval-seconds="settings.intervalSeconds = $event"
        @update:tick-during-pauses="settings.tickDuringPauses = $event"
        @preview="previewVoice"
      />

      <ScriptStepsSection :steps="scriptSteps" :current-index="currentIndex" @play-step="playFrom" />

      <QuestReference :player-count="settings.playerCount" :quest-sizes="questSizes" />
    </section>

    <NarrationBar :is-playing="isPlaying" @play="playFrom(0)" @stop="stop" />
  </main>
</template>
