<script setup lang="ts">
import type { Allegiance, RoleId } from '../data/avalon';

export interface RoleOptionView {
  id: RoleId;
  name: string;
  allegiance: Allegiance;
  summary: string;
  imageSrc: string;
  selected: boolean;
  disabled: boolean;
  required: boolean;
}

defineProps<{
  roles: RoleOptionView[];
  warning: string;
}>();

defineEmits<{
  toggleRole: [roleId: RoleId];
}>();
</script>

<template>
  <section class="mb-4 rounded-lg border border-slate-700/80 bg-slate-950/72 p-4">
    <div class="mb-3 flex items-center justify-between gap-3">
      <h2 class="text-lg font-semibold text-amber-100">Personajes</h2>
      <span class="text-right text-xs text-slate-400">Merlín y Asesino incluidos</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="role in roles"
        :key="role.id"
        type="button"
        class="overflow-hidden rounded-lg border text-left transition active:scale-[0.99]"
        :class="[
          role.selected ? 'border-amber-300 bg-amber-300/14 shadow-[0_0_0_1px_rgb(252_211_77/0.18)]' : 'border-slate-700 bg-slate-900/90',
          role.disabled ? 'cursor-not-allowed opacity-45' : ''
        ]"
        :disabled="role.disabled"
        @click="$emit('toggleRole', role.id)"
      >
        <div class="relative aspect-[3/4] bg-slate-950">
          <img :src="role.imageSrc" :alt="role.name" class="h-full w-full object-cover" loading="lazy" />
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/72 to-transparent p-2">
            <p class="font-semibold text-slate-50">{{ role.name }}</p>
          </div>
        </div>
        <div class="p-3">
          <div class="mb-2 flex items-center justify-between gap-2">
            <span
              class="text-xs font-semibold uppercase tracking-[0.12em]"
              :class="role.required ? 'text-slate-400' : role.selected ? 'text-amber-200' : 'text-slate-500'"
            >
              {{ role.required ? 'Obligatorio' : role.selected ? 'Seleccionado' : 'Opcional' }}
            </span>
          <span
            class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
            :class="role.allegiance === 'good' ? 'bg-sky-300/15 text-sky-200' : 'bg-rose-400/15 text-rose-200'"
          >
            {{ role.allegiance === 'good' ? 'Bien' : 'Mal' }}
          </span>
          </div>
          <p class="text-xs leading-5 text-slate-400">{{ role.summary }}</p>
        </div>
      </button>
    </div>
    <p v-if="warning" class="mt-3 rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-5 text-amber-100">
      {{ warning }}
    </p>
  </section>
</template>
