<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasLeft"
    aria-labelledby="offcanvasLeftLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasLeftLabel">Projects</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex justify-content-between border border-bottom">
        <p>Name</p>
        <p>Started</p>
      </div>
      <div v-for="p in projects" :key="p.id">
        <router-link :to="{ name: 'Project', params: { id: p.id } }">
          <div
            data-bs-dismiss="offcanvas"
            class="d-flex justify-content-between selectable"
          >
            <span>
              {{ p.name }}
            </span>
            <span>
              {{ p.createdAt }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from '../AppState'

export default {


  setup() {
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>