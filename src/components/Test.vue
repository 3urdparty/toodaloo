<template>
  <div class="flex gap-2">
    <div
      class="w-40 min-h-40 p-2 border border-dashed border-slate-400 rounded-md bg-slate-50"
      :key="containerIndex"
      @dragover.prevent
      @drop="onDrop(containerIndex, $event)"
    >
      <div
        class="p-2 m-4 bg-white border rounded-md cursor-grab transition transform"
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        draggable="true"
        @dragstart="onDragStart(containerIndex, itemIndex, item, $event)"
        @dragover="onItemDragOver($event, containerIndex, itemIndex)"
        @dragend="onDragEnd"
        :class="{ placeholder: isPlaceholder(containerIndex, itemIndex) }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface Props {
  containerIndex: number
}

const [items] = defineModel('items', {
  default: () => [],
})

const props = withDefaults(defineProps<Props>(), {})

const draggedItem = reactive({
  containerIndex: props.containerIndex,
  itemIndex: null,
  itemData: null,
})
const hoveredIndex = ref(0)
const hoveredContainer = ref(0)

const onDragStart = (containerIndex: number, itemIndex: number, item: string, event: DragEvent) => {
  const el = event.target as HTMLDivElement
  el.style.opacity = 0
  event.dataTransfer?.setData('text/plain', JSON.stringify({ containerIndex, itemIndex, item }))
}

const onItemDragOver = (event: DragEvent, containerIndex: number, itemIndex: number) => {
  if (draggedItem) {
    const bounding = (event.target as HTMLDivElement).getBoundingClientRect()
    const offset = event.clientY - bounding.top

    hoveredContainer.value = containerIndex

    // If the mouse is in the upper half of the item, set the index before the item
    if (offset < bounding.height / 2) {
      hoveredIndex.value = itemIndex
    }
    // If in the lower half, set the index after the item
    else {
      hoveredIndex.value = itemIndex + 1
    }
  }
}

const onDrop = (targetContainerIndex: number, event: DragEvent) => {
  const el = event.target
  el.style.opacity = 1
  const transferData = event.dataTransfer?.getData('text/plain')
  if (transferData) {
    const { containerIndex, itemIndex, item } = JSON.parse(transferData)

    // If moving within the same container and to a lower index, adjust the index
    if (containerIndex === targetContainerIndex && itemIndex < hoveredIndex.value) {
      hoveredIndex.value--
    }

    // Insert item at the hovered index

    items.value.splice(hoveredIndex.value, 0, item) // Insert at new position

    // Reset drag state
    draggedItem.containerIndex = null
    draggedItem.itemIndex = null
    draggedItem.itemData = null
    hoveredContainer.value = null
    hoveredIndex.value = null
  }
}

const onDragEnd = (event) => {
  hoveredContainer.value = 0
  hoveredIndex.value = 0

  const el = event.target
  el.style.opacity = 1
}

const isPlaceholder = (containerIndex: number, itemIndex: number) => {
  return containerIndex === hoveredContainer.value && itemIndex === hoveredIndex.value
}
</script>
