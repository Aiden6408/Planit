<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h3 id="offcanvasRightLabel">{{ activeTask.name }}</h3>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        title="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="text-center border-bottom">Notes</div>
      <h5 class="mt-5">Add a note..</h5>
      <form
        @submit.prevent="handleSubmit"
        class="mb-5 d-flex align-items-center"
      >
        <input
          v-model="editable.body"
          type="text"
          class="form-control me-2"
          name="note"
          id="note"
          placeholder="What do you want to say...? "
        />

        <div class="text-end">
          <button class="btn btn-info selectable">
            <i class="mdi mdi-plus"></i>
          </button>
        </div>
      </form>

      <div v-for="n in notes" :key="n.id">
        <div v-if="n.taskId == activeTask.id">
          <NoteTemplate :note="n" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      activeSprint: computed(() => AppState.activeSprintId),
      activeTask: computed(() => AppState.activeTask),
      notes: computed(() => AppState.notes),
      async handleSubmit() {
        try {
          editable.value.taskId = AppState.activeTask.id
          await notesService.createNote(route.params.id, editable.value)

        } catch (error) {

        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>