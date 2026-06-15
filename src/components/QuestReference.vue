<script setup lang="ts">
import type { PlayerCount } from '../data/avalon';

defineProps<{
  playerCount: PlayerCount;
  questSizes: [number, number, number, number, number];
}>();
</script>

<template>
  <section class="rounded-lg border border-slate-700/80 bg-slate-950/72 p-4">
    <h2 class="mb-3 text-lg font-semibold text-amber-100">Referencia rápida</h2>
    <div class="grid grid-cols-5 gap-2">
      <div v-for="(size, index) in questSizes" :key="index" class="rounded-lg bg-slate-900 p-2 text-center">
        <p class="text-xs text-slate-400">Gesta {{ index + 1 }}</p>
        <p class="text-xl font-semibold text-slate-100">{{ size }}</p>
      </div>
    </div>
    <p v-if="playerCount >= 7" class="mt-3 text-sm leading-5 text-slate-400">
      En partidas de 7 o más, la cuarta gesta necesita dos fracasos para fallar.
    </p>
  </section>
</template>
