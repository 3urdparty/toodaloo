<template>
  <div>
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <a href="#" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
          <ChevronLeftIcon class="-ml-1 mr-1 size-5 shrink-0 text-gray-500" aria-hidden="true" />
          Back
        </a>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div class="flex">
              <a href="#" class="text-sm font-medium text-gray-400 hover:text-gray-200">Jobs</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="size-5 shrink-0 text-gray-500" aria-hidden="true" />
              <a href="#" class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                >Engineering</a
              >
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="size-5 shrink-0 text-gray-500" aria-hidden="true" />
              <a
                href="#"
                aria-current="page"
                class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                >Back End Developer</a
              >
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          <slot name="title"> Title </slot>
        </h2>
      </div>
      <div class="mt-4 flex shrink-0 md:ml-4 md:mt-0">
        <button
          type="button"
          class="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          Edit
        </button>
        <Button> Create </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { ChevronRightIcon, type ChevronLeftIcon } from 'lucide-vue-next'
</script>
