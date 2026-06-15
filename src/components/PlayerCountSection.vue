<script setup lang="ts">
import type { PlayerCount } from '../data/avalon';

defineProps<{
  playerCounts: PlayerCount[];
  playerCount: PlayerCount;
  distribution: {
    good: number;
    evil: number;
  };
}>();

defineEmits<{
  'update:playerCount': [count: PlayerCount];
}>();
</script>

<template>
  <section class="mb-4 rounded-lg border border-slate-700/80 bg-slate-950/72 p-4 shadow-2xl shadow-black/30">
    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-amber-100">Jugadores</h2>
      <span class="text-sm text-slate-300">{{ distribution.good }} bien / {{ distribution.evil }} mal</span>
    </div>
    <div class="grid grid-cols-6 gap-2">
      <button
        v-for="count in playerCounts"
        :key="count"
        type="button"
        class="h-12 rounded-lg border text-base font-semibold transition active:scale-95"
        :class="playerCount === count ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-200'"
        @click="$emit('update:playerCount', count)"
      >
        {{ count }}
      </button>
    </div>
  </section>
</template>
