<template>
  <WritingEditor/>
  <div class="d-flex">
    <v-btn class="ml-auto ma-2">
      upload
    </v-btn>
  </div>
</template>

<script>
import WritingEditor from "@/components/community/WritingEditor.vue";

export default {
  components: { WritingEditor },

}
</script>

<style scoped>

</style>