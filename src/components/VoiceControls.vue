<script setup lang="ts">
defineProps<{
  voices: SpeechSynthesisVoice[];
  selectedVoiceUri: string;
  rate: number;
  intervalSeconds: number;
  tickDuringPauses: boolean;
  unsupported: boolean;
}>();

defineEmits<{
  'update:selectedVoiceUri': [voiceURI: string];
  'update:rate': [rate: number];
  'update:intervalSeconds': [intervalSeconds: number];
  'update:tickDuringPauses': [enabled: boolean];
  preview: [];
}>();
</script>

<template>
  <section class="mb-4 rounded-lg border border-slate-700/80 bg-slate-950/72 p-4">
    <h2 class="mb-3 text-lg font-semibold text-amber-100">Voz</h2>
    <label class="mb-3 block">
      <span class="mb-1 block text-sm text-slate-300">Tipo de voz</span>
      <select
        :value="selectedVoiceUri"
        class="field"
        @change="$emit('update:selectedVoiceUri', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Voz predeterminada</option>
        <option v-for="voice in voices" :key="voice.voiceURI" :value="voice.voiceURI">
          {{ voice.name }} - {{ voice.lang }}
        </option>
      </select>
    </label>
    <div class="grid grid-cols-2 gap-3">
      <label>
        <span class="mb-1 block text-sm text-slate-300">Velocidad {{ rate.toFixed(2) }}x</span>
        <input
          :value="rate"
          min="0.65"
          max="1.35"
          step="0.05"
          type="range"
          class="range"
          @input="$emit('update:rate', Number(($event.target as HTMLInputElement).value))"
        />
      </label>
      <label>
        <span class="mb-1 block text-sm text-slate-300">Pausa {{ intervalSeconds }}s</span>
        <input
          :value="intervalSeconds"
          min="1"
          max="8"
          step="1"
          type="range"
          class="range"
          @input="$emit('update:intervalSeconds', Number(($event.target as HTMLInputElement).value))"
        />
      </label>
    </div>
    <button type="button" class="mt-4 h-11 w-full rounded-lg border border-amber-300/40 bg-amber-300/10 font-semibold text-amber-100" @click="$emit('preview')">
      Probar voz
    </button>
    <label class="mt-3 flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-900/90 p-3">
      <span>
        <span class="block text-sm font-semibold text-slate-100">Sonido de espera</span>
        <span class="mt-1 block text-xs leading-5 text-slate-400">Reproduce un tick por segundo entre instrucciones.</span>
      </span>
      <input
        :checked="tickDuringPauses"
        type="checkbox"
        class="h-5 w-5 accent-amber-300"
        @change="$emit('update:tickDuringPauses', ($event.target as HTMLInputElement).checked)"
      />
    </label>
    <p v-if="unsupported" class="mt-3 text-sm text-rose-200">
      Este navegador no expone síntesis de voz. Puedes seguir usando el guion manualmente.
    </p>
  </section>
</template>
