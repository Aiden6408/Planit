<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex">
        <div
          title="Show task details"
          class="d-flex selectable"
          @click="setActiveTask"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
        >
          <div class="me-2">
            <i
              v-if="task.isComplete == true"
              title="Task complete?"
              class="mdi mdi-checkbox-marked"
            ></i>
            <i
              v-else
              title="Task complete?"
              class="mdi mdi-checkbox-blank-outline"
            ></i>
          </div>
          <h5 class="me-2">{{ task.name }}</h5>
        </div>
        <div
          @click="setActiveTask"
          data-bs-toggle="modal"
          data-bs-target="#edit-task"
          class="mdi mdi-pencil me-2 selectable"
          title="Edit Task"
        ></div>
        <i
          v-if="task.creatorId == account?.id"
          @click="deleteTask"
          title="Delete Task"
          class="mdi mdi-delete-forever selectable"
        ></i>
      </div>
      <div>Created on {{ date }}</div>
      <div class="d-flex">
        <!-- FIXME  Stretch goal-->
        <!-- <p>CommentCount</p>
        <i class="mdi mdi-comment"></i> -->
        <p class="me-2">{{ task.weight }}</p>
        <i class="mdi mdi-weight"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { tasksService } from "../services/TasksService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    let dateFormat = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      dateStyle: "short",
    });
    let date = dateFormat.format(new Date(props.task.createdAt));
    return {
      date,
      account: computed(() => AppState.account),
      setActiveTask() {
        AppState.activeTask = props.task
      },

      async deleteTask() {
        try {
          await tasksService.deleteTask(route.params.id, props.task.id)
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