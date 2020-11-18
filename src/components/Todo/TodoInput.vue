<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['add-task'],
  setup(props, { emit }) {
    const inputVal = ref<string>('')
    const addTask = () => {
      emit('add-task', inputVal.value)
      inputVal.value = ''
    }
    return {
      inputVal,
      addTask
    }
  }
})
</script>

<style scoped lang="stylus">
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
</style>
