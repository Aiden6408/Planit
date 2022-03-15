<template>
  <div class="row">
    <div class="col-4 selectable" @click="goTo">{{ project.name }}</div>
    <div class="col-4">Creator</div>
    <div class="col-4">Created on</div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { useRouter } from "vue-router"
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
        router.push({ name: 'Project', params: { id: props.project.id } })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>