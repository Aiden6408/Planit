<template>
  <form @submit.prevent="handleSubmit" class="mb-3">
    <input
      v-model="editable.name"
      type="text"
      class="form-control my-2"
      name="name"
      id="name"
      placeholder="Sprint name..."
      required
      minlength="3"
      maxlength="20"
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
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          await sprintsService.createSprint(route.params.id, editable.value)
          Modal.getOrCreateInstance(document.getElementById('create-sprint')).hide()
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