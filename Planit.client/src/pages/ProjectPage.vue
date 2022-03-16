<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex mt-5">
        <h1>title</h1>
        <i class="mdi mdi-delete-forever mdi-36px text-success"></i>
      </div>
      <p>project description</p>
      <div class="col-12 d-flex justify-content-between">
        <div>
          <h5>Sprints</h5>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            aliquid
          </p>
        </div>
        <div>
          <button class="btn btn-info">Add sprint</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="s in sprints" :key="s.id" class="col-12">
        <SprintCard :sprint="s" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { useRoute } from "vue-router"
import { AppState } from '../AppState'
import { watchEffect } from '@vue/runtime-core'
import { sprintsService } from "../services/SprintsService";
import { tasksService } from "../services/TasksService";
import { notesService } from "../services/NotesService";
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
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
      notes: computed(() => AppState.notes)


    }

  }
}

</script>


<style lang="scss" scoped>
</style>