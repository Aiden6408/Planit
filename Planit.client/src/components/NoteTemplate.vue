<template>
  <div class="border-info border my-2 p-2">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex">
        <div class="me-2">
          <img :src="note.creator.picture" alt="" class="imgsmall rounded" />
        </div>
        <div>{{ note.creator.name }}</div>
      </div>
      <i
        v-if="note.creatorId == account.id"
        @click="deleteNote"
        class="mdi mdi-close-outline text-danger"
        title="Delete note"
      ></i>
    </div>
    <div>{{ note.body }}</div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      async deleteNote() {
        try {
          if (await Pop.confirm()) {
            await notesService.deleteNote(route.params.id, props.note.id
            )
          }

        } catch (error) {
          logger.log("error", error.message)
          Pop.toast(error.message, "error")
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.imgsmall {
  height: 30px;
  width: 30px;
}
</style>