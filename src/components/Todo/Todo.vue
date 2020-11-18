<template>
  <div class="todo">
    <TodoTitle />
    <TodoTools
      :list="list"
      :active-type="activeType"
      @update-status="updateStatus"
    />
    <TodoInput @add-task="addTask" />
    <TodoList
      :filter-list="filterList"
      @del-task="delTask"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { TaskItem } from 'TYPES/todo'
import useTodo from 'HOOKS/useTodo'

import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import TodoTitle from './TodoTitle.vue'
import TodoTools from './TodoTools.vue'

export default defineComponent({
  components: {
    TodoInput, TodoList, TodoTitle, TodoTools
  },
  setup() {
    const activeType = ref<string>('all')
    const list = ref<TaskItem[]>([
      { name: 'Morning walk', completed: true, uuid: uuidv4() },
      { name: 'Meeting with Holden Caulfield', completed: false, uuid: uuidv4() }
    ])
    const filterList = computed(() => {
      switch (activeType.value) {
        case 'all':
          return list
        case 'active':
          return ref<TaskItem[]>(list.value.filter((item: TaskItem) => !item.completed))
        case 'completed':
          return ref<TaskItem[]>(list.value.filter((item: TaskItem) => item.completed))
        default:
          return list
      }
    })

    const updateStatus = (type: string) => {
      activeType.value = type
    }

    const { delTask, addTask } = useTodo(list)

    return {
      list,
      activeType,
      filterList,
      updateStatus,
      addTask,
      delTask
    }
  }
})
</script>
