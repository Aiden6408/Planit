<template>
  <form @submit.prevent="handleSubmit" class="mb-3">
    <label for="name">Project name:</label>
    <input
      v-model="editable.name"
      type="text"
      class="form-control my-2"
      name="name"
      id="name"
      placeholder="Project name..."
      required
      minlength="3"
      maxlength="20"
    />
    <label for="description">Project description:</label>
    <input
      v-model="editable.description"
      type="text"
      class="form-control my-2"
      name="description"
      id="description"
      placeholder="Project description..."
      required
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
import { projectsService } from "../services/ProjectsService"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          let newProject = await projectsService.createProject(editable.value)
          Modal.getOrCreateInstance(document.getElementById('create-project')).hide()
          router.push({ name: 'Project', params: { id: newProject.id } })
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