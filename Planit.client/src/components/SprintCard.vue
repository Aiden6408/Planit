<template>
  <div class="row bg-primary text-light shadow rounded-top mt-2 p-1">
    <div class="col-6 d-flex selectable">
      <p>{{ sprint.name }}</p>
      <p>{{ sprint.weight }}</p>
      <i class="mdi mdi-weight fs-5"></i>
    </div>
    <div class="col-6 d-flex justify-content-end">
      <button class="btn btn-light">Add Task +</button>
      <div>Task complete count</div>
    </div>
  </div>
  <div class="row bg-primary text-light shadow rounded-bottom mb-2 p-1">
    <div class="col-6" v-for="t in tasks" :key="t.id">
      <TaskTemplate :task="t" />
    </div>
    <div class="col-6 d-flex align-items-end justify-content-end">
      <div class="d-flex selectable">
        <h5>Delete Sprint</h5>
        <i class="mdi mdi-delete-forever"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      tasks: computed(() => AppState.tasks)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>