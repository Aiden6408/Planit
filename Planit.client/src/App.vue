<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <Modal id="edit-account">
      <template #title>Edit Account Information</template>
      <template #body><EditAccountForm /></template>
    </Modal>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
