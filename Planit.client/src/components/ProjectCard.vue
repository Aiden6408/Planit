<template>
  <div class="row">
    <h5 class="col-4 selectable" @click="goTo">{{ project.name }}</h5>
    <h5 class="col-4">
      <img class="rounded img-small" :src="project.creator.picture" alt="" />
      {{ project.creator.name }}
    </h5>
    <h5 class="col-4">{{ dateFormat.format(new Date(project.createdAt)) }}</h5>
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
    let dateFormat = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      dateStyle: "short",
    });
    return {
      dateFormat,
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
.img-small {
  height: 30px;
  width: 30px;
}
</style>