<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex mt-5">
        <h1>title</h1>
        <i class="mdi mdi-delete-forever mdi-36px text-success"></i>
      </div>
      <p>project description</p>
      <div class="col-12 d-flex justify-content-between">
        <div>
          <h5>Sprints</h5>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            aliquid
          </p>
        </div>
        <div>
          <button class="btn btn-info">Add sprint</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="s in sprints" :key="s.id" class="col-12">
        <SprintCard />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { useRoute } from "vue-router"
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import { sprintsService } from "../services/SprintsService";
export default {
  setup() {
    const route = useRoute()
    await sprintsService.getSprints(route.params.id)

    return {
      sprints: computed(() => AppState.sprints),


    }

  }
}

</script>


<style lang="scss" scoped>
</style>