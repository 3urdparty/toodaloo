<template>
  <Card fit="snug" class="bg-black">
    <div class="flex items-center gap-2 min-h-5 text-neutral-300">
      <input
        type="checkbox"
        class="bg-black"
        :checked="card.completed"
        @change="update({ completed: true })"
      />
      <p class="text-sm">
        {{ card.name }}
      </p>
    </div>
  </Card>
</template>
<script setup lang="ts">
import { TablesInsert, type TablesUpdate } from '@/types/database.types'
import Card from './Card.vue'
import { supabase } from '@/supabase'

const [card] = defineModel<TablesInsert<'cards'>>('modelValue', { required: true })

async function update(newCard: TablesUpdate<'cards'>) {
  const { data, error } = await supabase.from(`cards`).update(newCard).eq('id', card.value.id)
  if (error) console.error(error)
  return data
}
</script>
