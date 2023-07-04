<template>
    <v-card
        class="mx-auto"
        color="#ece6cc"
        theme="white"
        max-width="400"
    >

      <v-card-text class="text-h7 py-2">
        {{ post.content }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">

          <v-list-item-subtitle>{{ post.writer }}</v-list-item-subtitle>


          <template v-slot:append>
            <div class="justify-self-end">
<!--              <v-btn class="pa-0" @click="likePressed">-->
<!--                <v-icon class="me-1" icon="mdi-thumb-up-outline"></v-icon>-->
<!--                <span class="subheading me-2">256</span>-->
<!--              </v-btn>-->

<!--              <span class="me-0">·</span>-->

              <v-btn class="pa-0" @click="comment(post)">
                <v-icon class="me-1" icon="mdi-comment-text-outline"></v-icon>
                <span class="subheading me-2"> {{ post.comment.length }}</span>
              </v-btn>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>

</template>

<script>

export default {
  props: {
    commentOpen: Boolean,
    post: {},
  },
  methods: {
    likePressed() {

    },
    comment(post) {
      console.log(post);
      post.commentShow = !post.commentShow
    }
  }
}
</script>

<style scoped>

</style>