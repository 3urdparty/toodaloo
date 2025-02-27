<template>
  <Card class="text-neutral-400" :expanded="board.expanded" expandable>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button id="handle" class="active:cursor-grabbing hover:cursor-grab">
            <GripVertical class="w-4 text-neutral-500" />
          </button>

          <button
            @click="expand(board.id as number, !board.expanded)"
            class="hover:text-neutral-400 text-neutral-500 cursor-pointer"
          >
            <ChevronDown
              :class="[board.expanded ? 'rotate-0' : '-rotate-90']"
              class="w-4 transform transition-transform"
            />
          </button>

          <input
            type="text"
            class="font-medium text-sm dark:text-neutral-200 text-neutral-500"
            v-model="board.name"
            @change="
              updateBoard(board.id as number, { name: ($event.target as HTMLInputElement).value })
            "
          />
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-neutral-400">{{ board.cards.length }}</span>
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="flex items-center rounded-full text-neutral-400 w-4 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-100"
              >
                <span class="sr-only">Open options</span>
                <Ellipsis class="w-4" />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="remove(board.id as number)"
                      class="w-full text-start text-red-400 flex gap-2 items-center"
                      :class="[
                        active
                          ? 'bg-neutral-100 text-neutral-900 outline-none'
                          : 'text-neutral-700',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      <TrashIcon class="w-4" />
                      Delete
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
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
          itemKey="id"
        >
          <template #item="{ element, index }">
            <TaskCard
              draggable="true"
              @dragstart="
                (event: DragEvent) => {
                  event.dataTransfer.setData('application/my-app', JSON.stringify(element))
                  event.dataTransfer.effectAllowed = 'move'
                }
              "
              v-model="board.cards[index]"
              aria-dropeffect="move"
            />
          </template>
        </draggable>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { deleteCard } from '@/cards'
import { createCard, deleteBoard, updateCard, updateBoard } from '@/cards'
import type { TablesInsert } from '@/types/database.types'
import { ChevronDown, Ellipsis, GripVertical, TrashIcon } from 'lucide-vue-next'
import { reactive } from 'vue'
import draggable from 'vuedraggable'
import Card from './Card.vue'
import TextInput from './TextInput.vue'
import TaskCard from './TaskCard.vue'

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

async function expand(id: number, expanded: boolean) {
  board.value.expanded = expanded
  await updateBoard(id as number, { expanded })
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
</script>
