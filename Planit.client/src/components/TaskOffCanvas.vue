<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">{{ activeTask.name }}</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="text-center border-bottom">Notes</div>
      <div v-if="n.taskId == activeTask.id">
        <div v-for="n in notes" :key="n.id">
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
export default {
  setup() {
    return {
      activeTask: computed(() => AppState.activeTask),
      notes: computed(() => AppState.notes)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>