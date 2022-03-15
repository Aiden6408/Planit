<template>
  <div v-if="user.isAuthenticated" class="container-fluid">
    <div class="row py-5">
      <div
        class="
          col-md-10
          offset-md-1
          p-3
          pe-5
          bg-primary
          text-light
          shadow
          rounded
        "
      >
        <div class="row">
          <div class="d-flex justify-content-between col-12">
            <div>
              <h5>Title</h5>
              <p class="m-0">Description</p>
            </div>
            <button class="btn btn-secondary">Create Project</button>
          </div>
          <div class="col-4 border-bottom border-light pt-5">Name</div>
          <div class="col-4 border-bottom border-light pt-5">Members</div>
          <div class="col-4 border-bottom border-light pt-5">Created on</div>
          <div v-for="p in projects" :key="p.id" class="col-12">
            <ProjectCard :project="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="
      home
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="home-card p-5 bg-primary text-light rounded elevation-3">
      <h1>Please Login to Continue</h1>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { watchEffect } from "@vue/runtime-core"

export default {
  setup() {

    return {
      user: computed(() => AppState.user),
      projects: computed(() => AppState.projects)

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
