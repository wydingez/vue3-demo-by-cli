<template>
  <div class="task-tools">
    <div class="task-counts">
      {{ list.length }} tasks
    </div>
    <div class="task-filters">
      <button
        v-for="type in filterTypes"
        :key="type.key"
        class="task-filter"
        :class="{'is-active': type.key === activeType}"
        @click="updateStatus(type.key)"
      >
        {{ type.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TaskItem } from 'TYPES/todo'

const filterTypes = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' }
]

interface TodoToolsProps {
  list: TaskItem[];
  activeType: string;
}

export default defineComponent({
  props: {
    list: { type: Array as PropType<TaskItem[]>, default: () => ([]) },
    activeType: { type: String, default: '' }
  },
  emits: ['update-status'],
  setup(props: TodoToolsProps, { emit }) {
    const updateStatus = (type: string) => {
      emit('update-status', type)
    }
    return {
      filterTypes,
      updateStatus
    }
  }
})
</script>

<style scoped lang="stylus">
.task-tools {
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  align-items: center
  padding: 0 20px
  .task-counts {
    color: #8a9ca5
    font-size: 14px
  }
  .task-filters {
    .task-filter {
      border: 0
      padding: 3px 8px
      background: 0
      font-size: 14px
      line-height: 1
      cursor: pointer
      border-radius: 20px
      color: #8a9ca5
      &.is-active {
        background-color: #7996a5
        color: #fff
      }
    }
  }
}
</style>
