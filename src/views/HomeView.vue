<template>
  <div class="-mx-4 sm:-mx-6 lg:-mx-8">
    <div
      class="fixed left-0 w-screen bottom-0 bg-gradient-to-t from-neutral-800/90 h-20 z-10 flex items-end pointer-events-none"
    >
      <button
        class="flex items-center gap-2 w-full p-3 py-4 pointer-events-auto"
        ondrop="console.log('test')"
      >
        <Trash class="text-red-400" />
      </button>
    </div>
    <div class="px-4 pb-2">
      <PageHeader>
        <template #title> Boards </template>
      </PageHeader>
    </div>
    <ul class="flex flex-col sm:flex-row overflow-x-auto snap-x snap-proximity mt-2 px-4">
      <li v-for="(_, idx) in boards" :key="idx" class="snap-start pl-4">
        <KanbanBoard v-model="boards[idx]" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { getBoards, createBoard } from './../cards.ts'

const newBoard = {
  name: 'Board',
  owner_id: 'a2dd3832-6db4-44f2-80ca-348174df8ded',
}

import { ref, onMounted } from 'vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import PageHeader from '@/components/PageHeader.vue'
import { Trash } from 'lucide-vue-next'

const boards = ref([])

async function add() {
  const board = await createBoard(newBoard)
  console.log(board)

  boards.value.push(board)
}
onMounted(async () => {
  boards.value = await getBoards()
})
</script>
