<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasLeft"
    aria-labelledby="offcanvasLeftLabel"
  >
    <div class="offcanvas-header ps-3">
      <h1 class="text-center" id="offcanvasLeftLabel">Active Projects</h1>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div
        class="
          d-flex
          justify-content-between
          border-bottom border-5 border-dark
        "
      >
        <h3>Name</h3>
        <h3>Started</h3>
      </div>
      <div v-for="p in projects" :key="p.id">
        <router-link :to="{ name: 'Project', params: { id: p.id } }">
          <div
            data-bs-dismiss="offcanvas"
            class="d-flex justify-content-between selectable my-3"
          >
            <h6>
              <span class="">
                {{ p.name }}
              </span>
            </h6>
            <h6>
              <span class="">
                {{ dateFormat.format(new Date(p.createdAt)) }}
              </span>
            </h6>
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
    let dateFormat = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      dateStyle: "short",
    });
    return {
      dateFormat,
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>