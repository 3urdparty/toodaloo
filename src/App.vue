<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import AppShell from '@/layouts/AppShell.vue'
</script>

<template>
  <BaseLayout>
    <AppShell>
      <RouterView />
    </AppShell>
  </BaseLayout>
</template>
