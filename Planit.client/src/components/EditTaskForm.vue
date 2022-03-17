<template>
  <form @submit.prevent="handleSubmit" class="mb-3">
    <input
      v-model="editable.name"
      type="text"
      class="form-control my-2"
      name="name"
      id="name"
      placeholder="Task name..."
    />
    <input
      v-model="editable.weight"
      type="text"
      class="form-control my-2"
      name="weight"
      id="weight"
      placeholder="Task weight..."
    />
    <input
      type="checkbox"
      class="form-check-input"
      name="isComplete"
      id="isComplete"
      value="checkedValue"
      v-model="editable.isComplete"
    />

    <label class="ps-2 form-check-label" for="isComplete"> Is Complete? </label>
    <div class="text-end">
      <button class="btn btn-info selectable">
        <i class="mdi mdi-plus"></i>
      </button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { Modal } from "bootstrap"
import { tasksService } from "../services/TasksService"
import { useRoute } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = AppState.activeTask
    }
    )
    return {
      editable,
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      async handleSubmit() {
        try {
          await tasksService.editTask(route.params.id, AppState.activeTask?.id, editable.value)
          Modal.getOrCreateInstance(document.getElementById('edit-task')).hide()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>