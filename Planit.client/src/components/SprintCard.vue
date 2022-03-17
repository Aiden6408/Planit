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
      <!-- FIXME stretch goal -->
      <!-- <div>Task complete count</div> -->
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
      <div
        v-if="sprint.creatorId == account.id"
        @click="deleteSprint"
        class="d-flex selectable"
      >
        <h5 class="pe-2">Delete Sprint</h5>
        <i class="mdi mdi-delete-forever" title="Delete sprint"></i>
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


    return {
      props,
      account: computed(() => AppState.account),
      weight: computed(() => tasksService.getWeight(props.sprint.id)),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      pushId() {
        AppState.activeSprint = props.sprint
        logger.log('[pushId]', AppState.activeSprint.id)
      },
      async deleteSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.deleteSprint(route.params.id, props.sprint.id)
          }
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