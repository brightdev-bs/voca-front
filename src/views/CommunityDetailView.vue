<template>
  <h2>Today's Topic</h2>
  <div class="d-flex justify-center mb-6 bg-indigo-lighten-4">
    <h3> Introduce yourself </h3>
  </div>

  <div>
    <h2 class="d-inline-block">Posts</h2>
    <v-btn class="float-end me-3" @click="write = !write">Write</v-btn>
  </div>
  <hr class="ma-4">
  <div v-if="write">
    <v-textarea
        v-model="postContent"
        bg-color="amber-lighten-4"
        color="orange orange-darken-4"
        label="Label"
    />
    <div class="d-flex">
      <v-btn class="mb-5 ml-auto" @click="submitPost">submit</v-btn>
    </div>
  </div>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <PostCard
            @click="commentClicked"
            class="mb-3"/>
      </v-col>
      <v-col cols="12" sm="6">
        <v-col
            class="pa-0"
            @sendFlag="commentClicked"
            v-if="comment">
          <v-textarea
              bg-color="amber-lighten-4"
              color="orange orange-darken-4"
              label="Label"
              rows="4"
          />
          <div class="d-flex">
            <v-btn class="mb-5 ml-auto">submit</v-btn>
          </div>
        </v-col>
        <PostCard
            color="white"
            class="mb-3"/>
      </v-col>
    </v-row>
  </div>

</template>

<script>

import PostCard from "@/components/PostCard.vue";

export default {
  components: {PostCard},
  data() {
    return {
      write: false,
      comment: false,
      postContent: '',
    }
  },
  methods: {
    submitPost() {

    },
    commentClicked() {
      this.comment = !this.comment;
    }
  }
}
</script>

<style scoped>

</style>