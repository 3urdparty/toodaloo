<template>
  <div class="bg-slate-100 border border-slate-200 rounded-sm overflow-clip">
    <div class="border-b border-slate-200 p-2 px-3 pr-2 bg-slate-50 flex justify-between">
      <input
        type="text"
        class="font-medium text-sm text-gray-600"
        v-model="board.name"
        @change="
          updateBoard(board.id as number, { name: ($event.target as HTMLInputElement).value })
        "
      />

      <DeleteButton @click="deleteBoard(board.id as number)" />
    </div>
    <div class="p-2 px-3">
      <div class="mt-2">
        <input
          name="name"
          id="name"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
          type="text"
          v-model="newCard.name"
          @keypress.enter="add"
        />
      </div>
      <draggable
        class="flex flex-col gap-2 mt-4 mb-2"
        :list="board.cards"
        group="cards"
        @change="changeCard"
        itemKey="id"
      >
        <template #item="{ element, index }">
          <div
            class="bg-white rounded p-1.5 px-2 flex gap-2 justify-between border border-slate-200 text-sm items-center"
            :key="index"
          >
            {{ element.name }}
            <div class="flex items center">
              <DeleteButton @click="remove(element.id)" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { deleteCard } from '@/cards'
import { createCard, deleteBoard, updateCard, updateBoard } from '@/cards'
import DeleteButton from '@/components/DeleteButton.vue'
import type { TablesInsert } from '@/database.types'
import { reactive } from 'vue'
import draggable from 'vuedraggable'

const newCard = reactive({
  name: '',
})

const [board] = defineModel<TablesInsert<'boards'> & { cards: TablesInsert<'cards'>[] }>(
  'modelValue',
  {
    required: true,
  },
)

async function add() {
  const card = await createCard({ ...newCard, board_id: board.value.id })
  board.value.cards.push(card as TablesInsert<'cards'>)
  newCard.name = ''
}

async function remove(id: number) {
  await deleteCard(id)
  board.value.cards = board.value.cards.filter((c) => c.id != id)
}

async function changeCard(evt) {
  if (!evt.added) return
  const { element } = evt.added
  console.log(element)
  await updateCard(element.id, { ...element, board_id: board.value.id })
}
</script>
