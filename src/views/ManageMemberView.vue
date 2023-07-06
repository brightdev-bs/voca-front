<template>
  <h2>| Requested |</h2>
  <PostCardConfirm
      v-for="request in this.memberRequest"
      :key="request.id"
      :name="request.name"
      :introduction="request.introduction"
  />
</template>

<script>

import PostCardConfirm from "@/components/PostCardConfirm.vue";

export default {
  components: {PostCardConfirm},
  data() {
    return {
      memberRequest: {},
    }
  }
}
</script>

<style scoped>

</style>