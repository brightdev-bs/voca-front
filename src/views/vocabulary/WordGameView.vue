<template>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <VueAlert
          :show-alert="showAlert"
          :is-correct="isCorrect"
      />
    </v-col>
  </v-row>

  <VocaCard :current="current"/>

  <v-row justify="center">
    <v-col cols="12" sm="6">
      <v-text-field
          v-model="current.text"
          class="mt-3"
          label="Definition"
          variant="solo"/>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-btn @click="submit">submit</v-btn>
  </v-row>

  <template v-if="dialog">
    <VocaInfoDialog
        :wrongWords="result.wrongWords"
        @close="closeDialog()"
    >
    </VocaInfoDialog>
  </template>

</template>

<script>

import {useWordStore} from "@/stores/useWordStore";
import VocaInfoDialog from "@/components/voca/VocaInfoDialog.vue";
import VocaCard from "@/components/voca/VocaCard.vue";
import VueAlert from "@/components/common/VueAlert.vue";
import router from "@/router/router";

let index = 0;

export default {
  components: {VueAlert, VocaInfoDialog, VocaCard },
  mounted() {
    const store = useWordStore();
    this.words = store.getWords;
    this.next();
  },
  data() {
    return {
      words: [],
      current: {
        word: '',
        definition: '',
        note: '',
        text: '',
      },
      isDefinition: false,
      isCorrect: false,
      showAlert: false,
      result: {
        wrongWords: [],
      },
      title: 'Result',
      dialog: false,
    }
  },
  methods: {
    next() {
      if(this.words.length <= 0) return;
      if(this.words.length <= index) {
        alert("The word-game is finished !");
        this.calculateResult();
        return;
      }

      const word = this.words[index++];
      this.current.word = word.word;
      this.current.definition = word.definition;
      this.current.note = word.note;
      this.current.text = '';
    },
    submit() {
      const word = this.current;
      const def = word.definition.replace(/\s|^\[.*\]|\(.*\)/g, '');
      const txt = word.text.replace(/\s|^\[.*\]|\(.*\)/g, '');

      let correctFlag = false;
      if (def === txt) correctFlag = true;


      const defArr = new Set(def.split(","));
      const txtArr = txt.split(",");

      for (const text of txtArr) {
        if (defArr.has(text)) correctFlag = true;
      }

      this.checkAnswer(correctFlag, word);

      this.next();
    },
    checkAnswer(isCorrect, word) {
      if(isCorrect === true) {
        this.isCorrect = true;
      } else {
        this.result.wrongWords.push(Object.assign({}, word));
        this.isCorrect = false;
      }

      this.showAlert = true;
      this.hideAlert();
    },
    hideAlert() {
      setTimeout(() => {
        this.showAlert = false;
      }, 500);
    },
    calculateResult() {

      this.showResult();
    },
    showResult() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      router.push('/vocabulary?page=1')
    },
  }
}
</script>

<style scoped>

</style>