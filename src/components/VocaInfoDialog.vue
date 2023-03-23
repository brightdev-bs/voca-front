<template>
  <v-dialog
      activator="parent"
      width="400px"
  >
    <v-card>
      <template v-slot:title>
        {{ title }}
      </template>
      <v-card-text>
        점수 : {{ score }} <br>
        틀린 단어 : {{ wrongWords }} <br>
      </v-card-text>

      <v-card-actions>
        <v-btn
            variant="tonal"
            @click="moveToMain"
        >
          메인 페이지 이동
        </v-btn>
        <v-btn
            variant="tonal"
            @click="close"
        >
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    title: String,
    score: String,
    wrongWords: Array,
  },
  methods: {
    close() {
      this.$emit('close');
    },
    moveToMain() {
      this.$emit("main");
    }

  }

}
</script>

<style scoped>

</style>