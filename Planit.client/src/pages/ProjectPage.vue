<template>
  <div class="container">
    <div class="row">
      <div class="col-8 offset-2 d-flex mt-5">
        <h1>
          <b>{{ project?.name }}</b>
        </h1>
        <i
          @click="deleteProject"
          class="
            mdi mdi-delete-forever
            ms-5
            mdi-36px
            text-primary
            hoverable
            selectable
          "
          title="Delete Project"
        ></i>
      </div>
      <div class="col-8 offset-2">
        <p>{{ project?.description }}</p>
        <div>
          <button
            class="btn btn-info hoverable shadow"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasLeft"
            aria-controls="offcanvasLeft"
          >
            Projects List
          </button>
        </div>
      </div>
      <div class="col-8 offset-2 d-flex mt-5 justify-content-between">
        <div>
          <h1><b> Sprints </b></h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            aliquid
          </p>
        </div>
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#create-sprint"
            class="btn btn-info shadow hoverable selectable"
          >
            Add sprint
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="s in sprints" :key="s.id" class="col-8 offset-2">
        <SprintCard :sprint="s" />
      </div>
    </div>
  </div>
  <Modal id="add-task">
    <template #title> Add Task </template>
    <template #body>
      <CreateTaskForm />
    </template>
  </Modal>
  <Modal id="edit-task">
    <template #title>Edit Task</template>
    <template #body><EditTaskForm /></template>
  </Modal>
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
      account: computed(() => AppState.account),

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