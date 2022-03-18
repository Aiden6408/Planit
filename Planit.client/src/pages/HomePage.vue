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
              <h5>Projects</h5>
              <p class="m-0">
                A list of all projects created by {{ account.name }}
              </p>
            </div>
            <div>
              <button
                class="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#create-project"
              >
                Create Project
              </button>
            </div>
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
  <Modal id="create-project">
    <template #title>Create Project</template>
    <template #body>
      <CreateProjectForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { projectsService } from "../services/ProjectsService"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"

export default {
  setup() {

    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      async createProject() {
        try {
          await projectsService.createProject()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
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
