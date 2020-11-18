<template>
  <div class="task-title">
    <h1>{{ todayStr }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import getTodayStr from 'UTILS/getTodayStr'

export default defineComponent({
  setup() {
    const todayStr = ref<string>(getTodayStr())

    return { todayStr }
  }
})
</script>

<style scoped lang="stylus">
.task-title {
  margin: 0
  font-size: 20px
  font-weight: 600
  padding: 20px 20px 6px 20px
}
</style>
