<template>
  <div class="-mx-4 sm:-mx-6 lg:-mx-8">
    <div
      class="fixed bottom-0 w-full h-15 bg-gradient-to-t from-neutral-900/60 to-transparent z-100"
    >
      <Button @click="add()"> Create </Button>
      <div
        @dragover.prevent="(event: DragEvent) => (event.dataTransfer.dropEffect = 'move')"
        @drop.prevent="
          (event: DragEvent) => {
            const card = JSON.parse(event.dataTransfer.getData('application/my-app'))
            removeCard(card.board_id, card.id)
          }
        "
        class="text-red-400 p-4 hover:text-red-300"
      >
        <Trash />
      </div>
    </div>

    <div class="mt-4">
      <Draggable
        class="flex flex-col sm:flex-row overflow-x-auto scrollbar-none snap-x snap-proximity gap-5 scroll-px-5"
        :list="boards"
        group="boards"
        @start="console.log"
        @change="change"
        itemKey="id"
        handle="#handle"
      >
        <template #item="{ index }">
          <KanbanBoard v-model="boards[index]" class="min-w-3/5 lg:min-w-1/3 h-fit snap-start" />
        </template>
      </Draggable>
    </div>
  </div>
</template>
<script setup lang="ts">
import Draggable from 'vuedraggable'
import { getBoards, createBoard, deleteCard } from './../cards.ts'

const newBoard = {
  name: 'Board',
  owner_id: 'a2dd3832-6db4-44f2-80ca-348174df8ded',
}

import { ref, onMounted } from 'vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import PageHeader from '@/components/PageHeader.vue'
import Button from '@/components/Button.vue'

import { supabase } from '@/supabase'

async function removeCard(boardId: number, id: number) {
  await deleteCard(id)
  console.log(id)
  const boardIdx = boards.value.findIndex((b) => b.id == boardId)
  boards.value[boardIdx].cards = boards.value[boardIdx].cards.filter((c) => c.id !== id)
}

import { Trash } from 'lucide-vue-next'

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
