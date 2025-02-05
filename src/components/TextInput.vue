<template>
  <div>
    <input
      name="name"
      id="name"
      class="block w-full rounded-md bg-white dark:bg-neutral-800 px-3 py-1.5 text-base text-neutral-900 dark:text-neutral-300 outline-1 -outline-offset-1 outline-neutral-300 dark:outline-neutral-600 placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
      type="text"
      v-model="modelValue"
    />
  </div>
</template>
<script setup lang="ts">
const [modelValue] = defineModel<string>('modelValue')
</script>
