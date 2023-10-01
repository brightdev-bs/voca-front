<template>
  <v-btn @click="rulePopup = true">Rule</v-btn>
  <WordGameRuleDialog
      v-if="rulePopup"
    @closeRulePopup="rulePopup = false"
  />
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
          @keyup.enter="submit()"
          ref="answerField"
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
import WordGameRuleDialog from "@/components/voca/WordGameRuleDialog.vue";

export default {
  components: {WordGameRuleDialog, VueAlert, VocaInfoDialog, VocaCard },
  mounted() {
    const store = useWordStore();
    this.words = store.getWords;
    this.next();
  },
  data() {
    return {
      index: 0,
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
      rulePopup: false,
    }
  },
  methods: {
    next() {
      if(this.words.length <= 0) return;
      if(this.words.length <= this.index) {
        this.$refs.answerField.blur();
        this.dialog = true;
        return;
      }

      const word = this.words[this.index++];
      this.current.word = word.word;
      this.current.definition = word.definition;
      this.current.note = word.note;
      this.current.text = '';
    },
    submit() {
      const word = this.current;
      const def = word.definition.replace(/[\s[\]()...~-]/g, '').toLowerCase();
      const txt = word.text.replace(/[\s[\]()...~-]/g, '').toLowerCase();

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
    closeDialog() {
      this.dialog = false;
      router.push('/vocabulary?page=1')
    },
  }
}
</script>

<style scoped>

</style>