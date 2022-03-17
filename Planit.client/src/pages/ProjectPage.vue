<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex mt-5">
        <h1>{{ project?.name }}</h1>
        <i
          @click="deleteProject"
          class="mdi mdi-delete-forever mdi-36px text-success selectable"
          title="Delete Project"
        ></i>
      </div>
      <p>{{ project?.description }}</p>
      <div>
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasLeft"
          aria-controls="offcanvasLeft"
        >
          Projects List
        </button>
      </div>
      <div class="col-12 d-flex justify-content-between">
        <div>
          <h5>Sprints</h5>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            aliquid
          </p>
        </div>
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#create-sprint"
            class="btn btn-info"
          >
            Add sprint
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="s in sprints" :key="s.id" class="col-12">
        <SprintCard :sprint="s" />
      </div>
    </div>
  </div>

  <Modal id="create-sprint">
    <template #title>Create Sprint</template>
    <template #body><CreateSprintForm /></template>
  </Modal>
  <ProjectOffCanvas />
</template>


<script>
import { computed } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { useRoute, useRouter } from "vue-router"
import { AppState } from '../AppState'
import { watchEffect } from '@vue/runtime-core'
import { sprintsService } from "../services/SprintsService";
import { tasksService } from "../services/TasksService";
import { notesService } from "../services/NotesService";
import { projectsService } from "../services/ProjectsService"

export default {


  setup() {
    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      try {
        projectsService.setActive(route.params.id)
        await sprintsService.getSprints(route.params.id)
        await tasksService.getTasks(route.params.id)
        await notesService.getNotes(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      notes: computed(() => AppState.notes),
      projects: computed(() => AppState.projects),
      project: computed(() => AppState.activeProject),

      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.id)
            router.push({ name: 'Home' })
          }
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