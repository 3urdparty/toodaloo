<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol
      role="list"
      class="flex space-x-4 rounded-md bg-white dark:bg-neutral-700 px-6 shadow-sm border border-neutral-300 dark:border-neutral-600"
    >
      <li class="flex">
        <div class="flex items-center">
          <a href="#" class="dark:text-neutral-400 hover:text-gray-500">
            <House class="size-5 shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name" class="flex">
        <div class="flex items-center">
          <svg
            class="h-full w-6 shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a
            :href="page.href"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name }}</a
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { House } from 'lucide-vue-next'

const pages = [{ name: 'Boards', href: '/', current: false }]
</script>
