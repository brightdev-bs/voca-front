<template>

  <section class="ma-5">
    <h3 class="ma-3">영어 단어 추가하기</h3>
    <v-text-field
        v-model="this.form.word"
        class="mt-3"
        label="영어 단어"
        variant="solo">
    </v-text-field>

    <v-text-field
        v-model="this.form.definition"
        label="뜻"
        variant="solo">
    </v-text-field>

    <v-text-field
        v-model="this.form.note"
        label="부가 설명"
        variant="solo">
    </v-text-field>
    <v-btn class="float-right" @click="addWord">추가하기</v-btn>
  </section>

</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      form: {
        word: '',
        definition: '',
        note: '',
      }
    }
  },
  components: {

  },
  methods: {
    addWord() {

      console.log(localStorage.getItem("token"));

      axios
          .post(this.server + '/api/v1/words', JSON.stringify(this.form), {
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            }
          })
          .then(res => {
            console.log(res.data.statusCode)
            if(res.data.statusCode == '200 OK') {
              location.href = this.domain;
            }

          })
          .catch(err => {
            console.log(err);
          })
    },
  }

}
</script>

<style scoped>

</style>