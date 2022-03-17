<template>
  <form @submit.prevent="handleSubmit" class="mb-3">
    <input
      v-model="editable.name"
      type="text"
      class="form-control my-2"
      name="name"
      id="name"
      placeholder="Project name..."
      required
    />
    <input
      v-model="editable.picture"
      type="text"
      class="form-control my-2"
      name="pictureUrl"
      id="pictureUrl"
      placeholder="Project pictureUrl..."
      required
    />
    <div class="text-end">
      <button class="btn btn-info selectable">
        <i class="mdi mdi-plus"></i>
      </button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { accountService } from "../services/AccountService"
import { Modal } from "bootstrap"
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = AppState.account
    }
    )
    return {
      editable,
      account: computed(() => AppState.account),
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
          Modal.getOrCreateInstance(document.getElementById('edit-account')).hide()
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