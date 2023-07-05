<template>
  <v-textarea
      v-model="text"
      bg-color="amber-lighten-4"
      color="orange orange-darken-4"
      label="Study Vocabulary"
      variant="solo"
      readonly
  ></v-textarea>
  <v-row justify="end">
    <v-btn size="small" class="float-right me-4" @click="next">Next</v-btn>
  </v-row>

</template>

<script>

import {useWordStore} from "@/stores/useWordStore";

let index = 0;
export default {
  data() {
    return {
      words: [],
      text: '',
    }
  },
  mounted() {
    const store = useWordStore();
    this.words = store.getWords;
    this.next();
  },
  methods: {
    next() {
      if(this.words.length <= 0) return;
      if(this.words.length <= index) {
        alert("The study section is finished !")
        index = 0;
      }

      const word = this.words[index++];
      const wordText = word.word;
      const definition = word.definition;
      const note = word.note;

      this.text = wordText + '\t\t\t\t\t\t\t' + definition + '\n'
        + '\t\t' + note
    }
  }
}
</script>

<style scoped>

</style>