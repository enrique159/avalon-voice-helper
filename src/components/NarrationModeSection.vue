<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { NarrationMode } from '../data/avalon';

defineProps<{
  mode: NarrationMode;
}>();

defineEmits<{
  'update:mode': [mode: NarrationMode];
}>();

const { t } = useI18n();
</script>

<template>
  <section class="mb-4 rounded-lg border border-slate-700/80 bg-slate-950/72 p-4">
    <div class="mb-3">
      <h2 class="text-lg font-semibold text-amber-100">{{ t('narration.mode.title') }}</h2>
      <p class="mt-1 text-sm leading-5 text-slate-400">
        {{ t('narration.mode.description') }}
      </p>
    </div>
    <div class="grid grid-cols-2 gap-2 rounded-lg bg-slate-900 p-1">
      <button
        type="button"
        class="rounded-md px-3 py-2 text-sm font-semibold transition active:scale-[0.98]"
        :class="mode === 'simple' ? 'bg-amber-300 text-slate-950' : 'text-slate-300'"
        @click="$emit('update:mode', 'simple')"
      >
        {{ t('narration.mode.simple') }}
      </button>
      <button
        type="button"
        class="rounded-md px-3 py-2 text-sm font-semibold transition active:scale-[0.98]"
        :class="mode === 'original' ? 'bg-amber-300 text-slate-950' : 'text-slate-300'"
        @click="$emit('update:mode', 'original')"
      >
        {{ t('narration.mode.original') }}
      </button>
    </div>
    <p class="mt-3 text-sm leading-5 text-slate-400">
      {{ t('narration.mode.note') }}
    </p>
  </section>
</template>
