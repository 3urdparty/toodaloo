<template>
  <div v-on:dblclick="edit" v-on-click-outside="save" @keypress.enter.shift="save">
    <div v-if="!editing" v-html="parsed" name="" id="" />
    <textarea
      v-if="editing"
      name=""
      id=""
      v-model="modelValue"
      ref="textareaEl"
      class="w-full h-full"
      autofocus
    />
  </div>
</template>
<script setup lang="ts">
import { marked } from 'marked'
import { computed, ref } from 'vue'

import { vOnClickOutside } from '@vueuse/components'
import { useFocus } from '@vueuse/core'

const editing = ref(false)
const [modelValue] = defineModel('modelValue', { default: '' })
const parsed = computed(() => marked.parse(modelValue.value))
const textareaEl = ref<HTMLTextAreaElement>()

const { focused } = useFocus(textareaEl, { initialValue: false })
function edit() {
  editing.value = true
  focused.value = true
  console.log('TREST')
}

function save() {
  focused.value = false
  editing.value = false
  console.log('TREST')
}
</script>
<style>
@import 'tailwindcss';
h1 {
  @apply text-2xl font-bold text-gray-800 dark:text-gray-200;
}

h2 {
  @apply text-xl font-semibold text-gray-700 dark:text-gray-300;
}

h3 {
  @apply text-lg font-medium text-gray-600 dark:text-gray-400;
}

ul {
  @apply list-disc list-inside text-gray-800 dark:text-gray-300;
}

li {
  @apply mb-1;
}

a {
  @apply text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline;
}

code {
  @apply bg-gray-100 text-red-600 px-1 py-0.5 rounded dark:bg-gray-800 dark:text-red-400;
}

blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-700 dark:text-gray-400;
}

.highlight {
  @apply bg-yellow-200 dark:bg-yellow-600;
}

.graph-view {
  @apply w-full rounded-lg shadow-lg border border-gray-200 dark:border-gray-700;
}

.todo-list {
  @apply space-y-2;
}

.todo-item {
  @apply flex items-start space-x-2 text-gray-800 dark:text-gray-300;
}

.todo-checkbox {
  @apply mt-1 rounded text-blue-600 dark:text-blue-400;
}

.todo-text {
  @apply leading-tight;
}
</style>
