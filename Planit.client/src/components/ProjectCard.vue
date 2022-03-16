<template>
  <div class="row">
    <div class="col-4 selectable" @click="goTo">{{ project.name }}</div>
    <div class="col-4">Creator</div>
    <div class="col-4">Created on</div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { useRouter } from "vue-router"
import { projectsService } from '../services/ProjectsService'
import { AppState } from '../AppState'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      goTo() {
        projectsService.setActive(props.project.id)
        logger.log('setting active', AppState.activeProject)
        router.push({ name: 'Project', params: { id: props.project.id } })
      }

    }
  }
}
</script>


<style lang="scss" scoped>
</style>