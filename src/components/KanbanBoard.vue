<template>
  <Card class="select-none text-neutral-400">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button>
            <GripVertical class="w-4 text-neutral-500" />
          </button>

          <button>
            <ChevronDown class="w-4 text-neutral-500" />
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
          <button>
            <Ellipsis class="w-4" />
          </button>
        </div>
      </div>
    </template>

    <template #default>
      <div>
        <div class="mt-2">
          <TextInput v-model="newCard.name" @keypress.enter="add" />
        </div>
        <draggable
          class="flex flex-col gap-2 mt-4 mb-2"
          :list="board.cards"
          group="cards"
          @change="changeCard"
          itemKey="id"
        >
          <template #item="{ element, index }">
            <Card fit="snug">
              <p class="text-sm">
                {{ element.name }}
              </p>
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
import DeleteButton from '@/components/DeleteButton.vue'
import type { TablesInsert } from '@/database.types'
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
