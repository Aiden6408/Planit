<template>
  <div class="row">
    <div
      class="col-12 selectable"
      title="Show task details"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
    >
      <div class="d-flex">
        <div class="d-flex" @click="setActiveTask">
          <div class="me-2">
            <i
              v-if="task.isComplete == true"
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
          v-if="account.id == task.creatorId"
          @click="setActiveTask"
          data-bs-toggle="modal"
          data-bs-target="#edit-task"
          class="mdi mdi-pencil me-2 selectable text-warning"
          title="Edit Task"
        ></div>
        <i
          v-if="task.creatorId == account?.id"
          @click="deleteTask"
          title="Delete Task"
          class="mdi mdi-delete-forever selectable text-danger"
        ></i>
      </div>
      <div>Created on {{ date }}</div>
      <div class="d-flex">
        <p class="me-2">{{ noteCount }}</p>
        <i class="mdi mdi-comment me-4 sm-pad"></i>
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
import { notesService } from "../services/NotesService"
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
      noteCount: computed(() => notesService.noteCount(props.task.id)),
      setActiveTask() {
        AppState.activeSprint = props.task.sprint
        AppState.activeTask = props.task
      },

      async deleteTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.deleteTask(route.params.id, props.task.id)
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
.sm-pad {
  padding-top: 1px;
}
</style>