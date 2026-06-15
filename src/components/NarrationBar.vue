<script setup lang="ts">
defineProps<{
  isPlaying: boolean;
}>();

defineEmits<{
  play: [];
  stop: [];
}>();
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 border-t border-amber-200/20 bg-slate-950/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
    <div class="mx-auto flex max-w-md items-center gap-3">
      <button
        type="button"
        class="h-13 flex-1 rounded-lg bg-amber-300 px-4 font-bold text-slate-950 active:scale-[0.98]"
        @click="$emit('play')"
      >
        {{ isPlaying ? 'Narrando...' : 'Narrar guion' }}
      </button>
      <button
        type="button"
        class="h-13 w-24 rounded-lg border border-slate-700 bg-slate-900 font-semibold text-slate-100 transition active:bg-slate-700"
        @click="$emit('stop')"
      >
        Detener
      </button>
    </div>
  </nav>
</template>
