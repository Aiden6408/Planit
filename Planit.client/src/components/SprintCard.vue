<template>
  <div class="row bg-primary text-light shadow rounded-top mt-2 p-1">
    <div class="col-6 d-flex selectable">
      <p>{{ sprint.name }}</p>
      <p>{{ weight }}</p>
      <i class="mdi mdi-weight fs-5"></i>
    </div>
    <div class="col-6 d-flex justify-content-end">
      <button
        @click="pushId"
        data-bs-toggle="modal"
        data-bs-target="#add-task"
        class="btn btn-light"
      >
        Add Task +
      </button>
      <div>Task complete count</div>
    </div>
  </div>
  <div class="row bg-primary text-light shadow rounded-bottom mb-2 p-1">
    <div class="col-6">
      <div class="row">
        <div class="col-12" v-for="t in tasks" :key="t.id">
          <div v-if="t.sprintId == sprint.id">
            <TaskTemplate :task="t" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 d-flex align-items-end justify-content-end">
      <div class="d-flex">
        <h5>Delete Sprint</h5>
        <i @click="deleteSprint" class="mdi mdi-delete-forever selectable"></i>
      </div>
    </div>
  </div>
  <TaskOffCanvas />
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'
import { watchEffect } from "@vue/runtime-core"
import { tasksService } from "../services/TasksService"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const route = useRoute()

    // //FIXME fix weight adding
    // watchEffect(async () => {
    //   try {
    //     let weight = 
    //   } catch (error) {
    //     logger.error(error)
    //     Pop.toast(error.message, 'error')
    //   }
    // })

    return {
      // sprintWeight,
      props,
      weight: computed(() => tasksService.getWeight(props.sprint.id)),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      pushId() {
        AppState.activeSprintId = props.sprint.id
        logger.log('[pushId]', AppState.activeSprintId)
      },
      async deleteSprint() {
        try {
          await sprintsService.deleteSprint(route.params.id, props.sprint.id)
        } catch (error) {
          logger.log(error.message)
          Pop.toast(error.message, 'error')
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>