<template>
  <Card class="select-none text-neutral-400" :expanded="board.expanded" expandable>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button>
            <GripVertical class="w-4 text-neutral-500" />
          </button>

          <button
            @click="board.expanded = !board.expanded"
            class="hover:text-neutral-400 text-neutral-500 cursor-pointer"
          >
            <ChevronDown
              :class="[board.expanded ? 'rotate-0' : '-rotate-90']"
              class="w-4 transform transition-transform"
            />
          </button>

          <input
            type="text"
            class="font-medium text-sm text-neutral-200"
            v-model="board.name"
            @change="
              updateBoard(board.id as number, { name: ($event.target as HTMLInputElement).value })
            "
          />
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-neutral-400">{{ board.cards.length }}</span>
          <button @click="remove(board.id as number)">
            <Ellipsis class="w-4" />
          </button>
        </div>
      </div>
    </template>

    <template #default>
      <div
        :class="{
          'h-0': !board.expanded,
        }"
      >
        <div class="mt-2">
          <TextInput v-model="newCard.name" @keypress.enter="add" />
        </div>
        <draggable
          class="flex flex-col gap-2 mt-4 mb-2"
          :list="board.cards"
          group="cards"
          @change="changeCard"
          @start="console.log"
          @end="handleDrop"
          itemKey="id"
        >
          <template #item="{ element, index }">
            <Card fit="snug" :key="index">
              <div class="flex items-center gap-1">
                <input type="checkbox" />
                <p class="text-sm">
                  {{ element.name }}
                </p>
              </div>
            </Card>
          </template>
        </draggable>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { deleteCard } from '@/cards'
import { createCard, deleteBoard, updateCard, updateBoard } from '@/cards'
import type { TablesInsert } from '@/types/database.types'
import { ChevronDown, Ellipsis, GripVertical } from 'lucide-vue-next'
import { reactive } from 'vue'
import draggable from 'vuedraggable'
import Card from './Card.vue'
import TextInput from './TextInput.vue'

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

async function removeCard(id: number) {
  await deleteCard(id)
  console.log(id)
  board.value.cards = board.value.cards.filter((c) => c.id != id)
}

async function remove(id: number) {
  await deleteBoard(id)
  console.log(id)
}

async function changeCard(evt, og) {
  console.log(evt)
  if (!evt.added) return
  const { element } = evt.added
  await updateCard(element.id, { ...element, board_id: board.value.id })
}

function handleDrop(evt) {
  console.log(evt)
}
</script>
