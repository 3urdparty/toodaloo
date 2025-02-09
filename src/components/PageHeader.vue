<template>
  <div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          <slot name="title"> Title </slot>
        </h2>
      </div>
      <div class="mt-4 flex shrink-0 md:ml-4 md:mt-0">
        <slot name="right"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { ChevronRightIcon, type ChevronLeftIcon } from 'lucide-vue-next'
</script>
