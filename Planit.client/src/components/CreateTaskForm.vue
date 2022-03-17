<template>
  <form @submit.prevent="handleSubmit" class="mb-3">
    <input
      v-model="editable.name"
      type="text"
      class="form-control my-2"
      name="name"
      id="name"
      placeholder="Task Name..."
    />
    <input
      v-model="editable.weight"
      type="number"
      class="form-control my-2"
      name="weight"
      id="weight"
      placeholder="Task Weight..."
    />

    <div class="text-end">
      <button class="btn btn-info selectable">
        <i class="mdi mdi-plus"></i>
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"

import { Modal } from "bootstrap"

import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService'
import { AppState } from "../AppState"
export default {


  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          editable.value.sprintId = AppState.activeSprint.id
          await tasksService.createTask(route.params.id, editable.value)
          Modal.getOrCreateInstance(document.getElementById('add-task')).hide()
          editable.value = {}
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