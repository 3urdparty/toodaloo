<template>
  <div class="-mx-4 sm:-mx-6 lg:-mx-8">
    <div class="px-8">
      <PageHeader>
        <template #right>
          <Button @click="add()"> Create </Button>
        </template>
        <template #title> Boards </template>
      </PageHeader>
    </div>

    <Draggable
      class="flex flex-col sm:flex-row overflow-x-auto scrollbar-none snap-x snap-proximity px-8 gap-5 scroll-px-5"
      :list="boards"
      group="boards"
      @start="console.log"
      @change="change"
      itemKey="id"
      handle="#handle"
    >
      <template #item="{ index }">
        <KanbanBoard v-model="boards[index]" class="min-w-1/3 lg:min-w-1/4 h-fit snap-start" />
      </template>
    </Draggable>
  </div>
</template>
<script setup lang="ts">
import Draggable from 'vuedraggable'
import { getBoards, createBoard } from './../cards.ts'

const newBoard = {
  name: 'Board',
  owner_id: 'a2dd3832-6db4-44f2-80ca-348174df8ded',
}

import { ref, onMounted } from 'vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import PageHeader from '@/components/PageHeader.vue'
import Button from '@/components/Button.vue'
import { updateBoard } from './../cards.ts'
import { supabase } from '@/supabase'
import MarkedInput from '@/components/MarkedInput.vue'
import Card from '@/components/Card.vue'

const boards = ref([])

async function add() {
  const board = await createBoard(newBoard)
  console.log(board)

  boards.value.push(board)
}

async function change(evt) {
  if (!evt.moved) return
  const { element, newIndex, oldIndex } = evt.moved
  console.log(element, newIndex)
  await supabase.from(`boards`).update({ order_index: oldIndex }).eq('order_index', newIndex)
  await supabase.from(`boards`).update({ order_index: newIndex }).eq('id', element.id)
}
onMounted(async () => {
  boards.value = await getBoards()
})
</script>
