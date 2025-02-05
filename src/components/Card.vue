<template>
  <div>
    {{ name }}
  </div>
</template>
<script setup lang="ts">
interface Props {
  name: string
}
defineProps<Props>()
</script>
