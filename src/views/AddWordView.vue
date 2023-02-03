<template>

  <section class="ma-5">
    <h3 class="ma-3">영어 단어 추가하기</h3>
    <v-text-field class="mt-3" label="영어 단어" variant="solo"></v-text-field>
    <v-text-field label="뜻" variant="solo"></v-text-field>
    <v-text-field label="부가 설명" variant="solo"></v-text-field>
    <v-btn class="float-right" @click="addWord">추가하기</v-btn>
  </section>

</template>

<script>

export default {
  components: {

  },
  methods: {
    addWord() {
      // Todo : ajax쏘고 메인으로 이동
    }
  }

}
</script>

<style scoped>

</style>