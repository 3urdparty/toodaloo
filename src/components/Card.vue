<template>
  <div
    class="divide-y divide-neutral-300 text-neutral-500 dark:divide-neutral-600 overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-700/80 border border-neutral-300 dark:border-neutral-600/80 dark:shadow shadow-xs"
  >
    <div
      v-if="$slots.header"
      class="bg-white dark:bg-neutral-400"
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
      class="transform transition-[max-height]"
    >
      <slot v-if="!expandable || expanded" />
    </div>
    <div class="px-4 py-4 sm:px-6" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  fit?: 'snug' | 'default'
  expanded: boolean
  expandable: boolean
}
withDefaults(defineProps<Props>(), {
  fit: 'default',
  expandable: false,
  expanded: true,
})
</script>
