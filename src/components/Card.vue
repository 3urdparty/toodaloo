<template>
  <div
    class="divide-y divide-neutral-200 dark:divide-neutral-600 overflow-hidden rounded-lg bg-white dark:bg-neutral-700/80 border border-neutral-600/80 shadow"
  >
    <div
      v-if="$slots.header"
      :class="{
        'px-3 py-3 sm:px-4': fit == 'default',
        'px-2 py-3 sm:px-2': fit == 'snug',
      }"
    >
      <slot name="header" />
    </div>
    <div
      :class="{
        'px-3 py-3 sm:px-4': fit == 'default',
        'px-2 py-2 sm:px-3': fit == 'snug',
      }"
    >
      <slot />
    </div>
    <div class="px-4 py-4 sm:px-6" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  fit?: 'snug' | 'default'
}
withDefaults(defineProps<Props>(), {
  fit: 'default',
})
</script>
