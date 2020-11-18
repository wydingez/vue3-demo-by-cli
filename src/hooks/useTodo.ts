import { v4 as uuidv4 } from 'uuid'
import { TaskItem } from 'TYPES/todo'
import { Ref } from 'vue'

export default function useTodo(list: Ref<TaskItem[]>) {
  const addTask = (value: string): void => {
    list.value.push({
      name: value,
      completed: false,
      uuid: uuidv4()
    })
  }
  const delTask = (uuid: string): void => {
    list.value.splice(list.value.findIndex((item: TaskItem) => item.uuid === uuid), 1)
  }

  return {
    addTask,
    delTask
  }
}
