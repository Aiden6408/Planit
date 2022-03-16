<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex">
        <i class="mdi mdi-check"></i>
        <span>{{ task.name }}</span
        ><i class="mdi mdi-delete-forever selectable"></i>
      </div>
      <div>Created on</div>
      <div class="d-flex">
        <p>CommentCount</p>
        <i class="mdi mdi-comment"></i>
        <p>WeightCount</p>
        <i class="mdi mdi-weight"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>