<script setup lang="ts">
import type { ScriptStep } from '../data/avalon';

defineProps<{
  steps: ScriptStep[];
  currentIndex: number;
}>();

defineEmits<{
  playStep: [index: number];
}>();
</script>

<template>
  <section class="mb-4 rounded-lg border border-slate-700/80 bg-slate-950/72 p-4">
    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-amber-100">Guion inicial</h2>
      <span class="text-sm text-slate-400">{{ steps.length }} pasos</span>
    </div>
    <ol class="space-y-3">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="rounded-lg border p-3"
        :class="index === currentIndex ? 'border-amber-300 bg-amber-300/12' : 'border-slate-800 bg-slate-900/70'"
      >
        <div class="mb-2 flex items-center justify-between gap-3">
          <p class="font-semibold text-slate-100">{{ index + 1 }}. {{ step.title }}</p>
          <button type="button" class="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200" @click="$emit('playStep', index)">
            Narrar
          </button>
        </div>
        <p class="text-sm leading-6 text-slate-300">{{ step.text }}</p>
      </li>
    </ol>
  </section>
</template>
