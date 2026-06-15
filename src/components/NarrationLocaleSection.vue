<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { localeOptions, type SupportedLocale } from '../i18n/messages';

defineProps<{
  locale: SupportedLocale;
}>();

defineEmits<{
  'update:locale': [locale: SupportedLocale];
}>();

const { t } = useI18n();
</script>

<template>
  <section class="mb-4 rounded-lg border border-slate-700/80 bg-slate-950/72 p-4">
    <div class="mb-3">
      <h2 class="text-lg font-semibold text-amber-100">{{ t('narration.locale.title') }}</h2>
      <p class="mt-1 text-sm leading-5 text-slate-400">
        {{ t('narration.locale.description') }}
      </p>
    </div>
    <div class="space-y-2">
      <button
        v-for="option in localeOptions"
        :key="option.value"
        type="button"
        class="w-full rounded-lg border p-3 text-left transition active:scale-[0.99]"
        :class="locale === option.value ? 'border-amber-300 bg-amber-300/14' : 'border-slate-700 bg-slate-900/90'"
        @click="$emit('update:locale', option.value)"
      >
        <p class="font-semibold text-slate-50">{{ option.label }}</p>
        <p class="mt-1 text-xs leading-5 text-slate-400">{{ option.description }}</p>
      </button>
    </div>
    <p class="mt-3 text-sm leading-5 text-slate-400">
      {{ t('narration.locale.note') }}
    </p>
  </section>
</template>
