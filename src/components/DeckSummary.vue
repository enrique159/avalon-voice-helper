<script setup lang="ts">
import type { AvalonDeck } from '../data/avalon';

defineProps<{
  deck: AvalonDeck;
}>();
</script>

<template>
  <section class="mb-4 rounded-lg border border-slate-700/80 bg-slate-950/72 p-4">
    <h2 class="mb-3 text-lg font-semibold text-amber-100">Mazo creado</h2>
    <div class="grid grid-cols-2 gap-3">
      <div class="rounded-lg bg-sky-300/10 p-3">
        <p class="text-2xl font-semibold text-sky-100">{{ deck.good }}</p>
        <p class="text-xs text-sky-200/70">Bien total</p>
      </div>
      <div class="rounded-lg bg-rose-400/10 p-3">
        <p class="text-2xl font-semibold text-rose-100">{{ deck.evil }}</p>
        <p class="text-xs text-rose-200/70">Mal total</p>
      </div>
    </div>
    <div class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="role in deck.specialRoles"
        :key="role.id"
        class="rounded-full border border-amber-200/20 bg-slate-900 px-3 py-1 text-sm text-slate-200"
      >
        {{ role.name }}
      </span>
      <span v-if="deck.loyalServants > 0" class="rounded-full border border-sky-200/20 bg-slate-900 px-3 py-1 text-sm text-slate-200">
        {{ deck.loyalServants }} leales
      </span>
      <span v-if="deck.minions > 0" class="rounded-full border border-rose-200/20 bg-slate-900 px-3 py-1 text-sm text-slate-200">
        {{ deck.minions }} esbirros
      </span>
    </div>
  </section>
</template>
