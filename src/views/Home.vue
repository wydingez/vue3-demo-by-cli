<template>
  <div class="task-todo">
    <div class="task-title">
      <h1>{{ todayStr }}</h1>
    </div>
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
          @click="activeType = type.key"
        >
          {{ type.label }}
        </button>
      </div>
    </div>
    <form
      class="task-form"
      @submit.prevent
    >
      <input
        v-model="inputVal"
        type="text"
        class="task-input"
        placeholder="Add a new task..."
        @keyup.enter="addTask"
      >
      <button class="task-button">
        Add Task
      </button>
    </form>
    <div class="task-list">
      <div
        v-for="item in filterList.value"
        :key="item.uuid"
        class="task-item"
        :class="{'is-completed': item.completed}"
      >
        <input
          v-model="item.completed"
          type="checkbox"
          class="task-status"
          @click="item.completed = !item.completed"
        >
        <label class="task-name">{{ item.name }} </label>
        <button
          class="task-delete"
          @click="delTask(item.uuid)"
        />
      </div>
      <div
        v-if="!filterList.value.length"
        class="task-empty"
      >
        Not found a task
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref
} from 'vue'

import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import iosWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(iosWeek)

const filterTypes = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' }
]

interface TaskItem {
  name: string;
  completed: boolean;
  uuid: string;
}

export default defineComponent({
  name: 'Home',
  setup() {
    const inputVal = ref<string>('')
    const activeType = ref<string>('all')
    const list = ref<TaskItem[]>([
      { name: 'Morning walk', completed: true, uuid: uuidv4() }, { name: 'Meeting with Holden Caulfield', completed: false, uuid: uuidv4() }
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

    const today = dayjs()
    const dayOfWeek = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'][today.isoWeekday()]
    const todayStr = ref<string>(dayOfWeek + today.format(' MMM DD YYYY'))

    const delTask = (uuid: string): void => {
      list.value.splice(list.value.findIndex((item) => item.uuid === uuid), 1)
    }
    const addTask = (): void => {
      list.value.push({
        name: inputVal.value,
        completed: false,
        uuid: uuidv4()
      })
      inputVal.value = ''
    }

    return {
      filterTypes, activeType, filterList, delTask, addTask, inputVal, list, todayStr
    }
  }
})
</script>

<style lang="stylus" scoped>
.task-todo {
  .task-title {
    margin: 0
    font-size: 20px
    font-weight: 600
    padding: 20px 20px 6px 20px
  }
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
  .task-form {
    display: flex
    margin-top: 10px
    .task-input {
      flex: 1
      font-size: 16px
      padding: 10px 20px
      border: 0
      box-shadow: 0 -1px 0 #e2e4ea inset
      color: #455963
      margin: 0
      &:focus {
        box-shadow: 0 -1px 0 #bdcdd6 inset
      }
      &::-webkit-input-placeholder {
        color: #a8b5bb
      }
    }
    .task-button {
      display: none
    }
  }
  .task-list {
    max-height: 60vh
    overflow: auto
    .task-item {
      display: flex
      flex-wrap: wrap
      align-items: center
      padding: 12px 20px
      .task-status {
        appearance: none
        width: 18px
        height: 18px
        cursor: pointer
        border: 2px solid #bbbdc7
        border-radius: 50%
        margin-right: 10px
        position: relative
        &:checked {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='405.272' height='405.272'%3e%3cpath d='M393.401 124.425L179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z' fill='%23fff'/%3e%3c/svg%3e")
          background-size: 10px
          background-color: #4acea3
          border-color: #4acea3
          background-repeat: no-repeat
          background-position: center
        }
      }
      .task-name {
        margin-right: auto
        flex: 1
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      }
      .task-delete {
        border: 0
        width: 18px
        height: 18px
        padding: 0
        overflow: hidden
        background-color: transparent
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23dc4771' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 174.239 174.239'%3e%3cpath d='M87.12 0C39.082 0 0 39.082 0 87.12s39.082 87.12 87.12 87.12 87.12-39.082 87.12-87.12S135.157 0 87.12 0zm0 159.305c-39.802 0-72.185-32.383-72.185-72.185S47.318 14.935 87.12 14.935s72.185 32.383 72.185 72.185-32.384 72.185-72.185 72.185z'/%3e%3cpath d='M120.83 53.414c-2.917-2.917-7.647-2.917-10.559 0L87.12 76.568 63.969 53.414c-2.917-2.917-7.642-2.917-10.559 0s-2.917 7.642 0 10.559l23.151 23.153-23.152 23.154a7.464 7.464 0 000 10.559 7.445 7.445 0 005.28 2.188 7.437 7.437 0 005.28-2.188L87.12 97.686l23.151 23.153a7.445 7.445 0 005.28 2.188 7.442 7.442 0 005.28-2.188 7.464 7.464 0 000-10.559L97.679 87.127l23.151-23.153a7.465 7.465 0 000-10.56z'/%3e%3c/svg%3e")
        background-repeat: no-repeat
        background-size: cover
        cursor: pointer
        display: none
        margin-left: 10px
      }
      &:hover {
        background-color: #f6fbff
        .task-delete {
          display: block;
        }
      }
      &.is-completed {
        background-color: rgba(74, 206, 163, 0.1)
        .task-name {
          text-decoration: line-through wavy rgba(0, 0, 0, 0.3)
        }
      }
      &+.task-item {
        border-top: 1px solid #eef0f5;
      }
    }
    .task-empty {
      height: 120px
      display: flex
      align-items: center
      justify-content center
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23f4f4f4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 486.463 486.463'%3e%3cpath d='M243.225 333.382c-13.6 0-25 11.4-25 25s11.4 25 25 25c13.1 0 25-11.4 24.4-24.4.6-14.3-10.7-25.6-24.4-25.6z'/%3e%3cpath d='M474.625 421.982c15.7-27.1 15.8-59.4.2-86.4l-156.6-271.2c-15.5-27.3-43.5-43.5-74.9-43.5s-59.4 16.3-74.9 43.4l-156.8 271.5c-15.6 27.3-15.5 59.8.3 86.9 15.6 26.8 43.5 42.9 74.7 42.9h312.8c31.3 0 59.4-16.3 75.2-43.6zm-34-19.6c-8.7 15-24.1 23.9-41.3 23.9h-312.8c-17 0-32.3-8.7-40.8-23.4-8.6-14.9-8.7-32.7-.1-47.7l156.8-271.4c8.5-14.9 23.7-23.7 40.9-23.7 17.1 0 32.4 8.9 40.9 23.8l156.7 271.4c8.4 14.6 8.3 32.2-.3 47.1z'/%3e%3cpath d='M237.025 157.882c-11.9 3.4-19.3 14.2-19.3 27.3.6 7.9 1.1 15.9 1.7 23.8 1.7 30.1 3.4 59.6 5.1 89.7.6 10.2 8.5 17.6 18.7 17.6s18.2-7.9 18.7-18.2c0-6.2 0-11.9.6-18.2 1.1-19.3 2.3-38.6 3.4-57.9.6-12.5 1.7-25 2.3-37.5 0-4.5-.6-8.5-2.3-12.5-5.1-11.2-17-16.9-28.9-14.1z'/%3e%3c/svg%3e")
      background-repeat: no-repeat;
      background-position: center;
      font-weight: 500;
      font-size: 18px;
      background-size: 80px;
    }
  }
}
</style>
