<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex">
        <i class="mdi mdi-check"></i>
        <span>{{ task.name }}</span
        ><i @click="deleteTask" class="mdi mdi-delete-forever selectable"></i>
      </div>
      <div>Created on</div>
      <div class="d-flex">
        <p>CommentCount</p>
        <i class="mdi mdi-comment"></i>
        <p>{{ task.weight }}</p>
        <i class="mdi mdi-weight"></i>
        <p>{{ task.isComplete }}</p>
      </div>
      <div
        @click="setActiveTask"
        data-bs-toggle="modal"
        data-bs-target="#edit-task"
        class="mdi mdi-pencil"
      ></div>
    </div>
  </div>
  <Modal id="edit-task">
    <template #title>Edit Task</template>
    <template #body><EditTaskForm /></template>
  </Modal>
</template>


<script>
import { ref } from "@vue/reactivity"
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
    return {
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