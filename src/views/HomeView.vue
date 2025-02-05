<template>
  <div class="px-8 py-6">
    <button
      type="button"
      class="rounded-md bg-white dark:bg-neutral-700 px-3 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-300 shadow-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600"
      @click="add"
    >
      Add Board
    </button>
    <div class="flex gap-4 overflow-x-auto snap-x snap-proximity mt-2">
      <li v-for="(_, idx) in boards" :key="idx" class="snap-center">
        <KanbanBoard v-model="boards[idx]" class="w-3/3" />
      </li>
    </div>
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
