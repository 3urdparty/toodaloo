<template>
  <div>
    <div class="grid grid-cols-3 px-8 py-6 gap-4">
      <Board v-for="(board, idx) in boards" v-model="boards[idx]" />
      <button @click="createBoard(newBoard)">Create Board</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Board from '@/components/Board.vue'
import { getBoards, createBoard } from './../cards.ts'

const newBoard = {
  name: 'Board',
  owner_id: 'a2dd3832-6db4-44f2-80ca-348174df8ded',
}

import { ref, onMounted } from 'vue'

const boards = ref([])

onMounted(async () => {
  boards.value = await getBoards()
})
</script>
