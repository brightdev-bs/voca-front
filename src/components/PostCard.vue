<template>
    <v-card
        class="mx-auto"
        color="#ece6cc"
        theme="white"
        max-width="400"
    >

      <v-card-text class="text-h7 py-2">
        Hi. I'm Byeongsu KIM. I'm from Korea. I like football, reading, drinking and games
        Let's Have a fun together
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>

          </template>

          <v-list-item-subtitle>Evan You</v-list-item-subtitle>


          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon class="me-1" icon="mdi-thumb-up-outline" @click="likePressed"></v-icon>
              <span class="subheading me-2">256</span>
              <span class="me-1">·</span>
              <v-icon class="me-1" icon="mdi-comment-text-outline" @click="comment"></v-icon>
              <span class="subheading me-2">256</span>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>

</template>

<script>

export default {
  props: {
    commentOpen: Boolean
  },
  methods: {
    likePressed() {

    },
    comment() {
      console.log("클릭됨.")
      this.$emit('sendFlag', !this.commentOpen);
    }
  }
}
</script>

<style scoped>

</style>