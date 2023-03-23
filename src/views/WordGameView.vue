<template>
  <div class="ma-5">
    <v-row
        v-for="word in words"
        :key="word.key"
    >
      <v-col>
        <v-card
            :text="word.word"
            variant="outlined"
            :style="word.isWrong ? 'border: 1px solid red;' : 'border: 1px solid black;'"
        >
        </v-card>
      </v-col>
      <v-col>
          <v-text-field v-model="word.text">

          </v-text-field>
      </v-col>
    </v-row>

    <v-row class="me-1" justify="end">
      <v-btn @click="submit">
        제출
      </v-btn>
    </v-row>
  </div>

  <template v-if="dialog">
    <VocaInfoDialog
        :score="result.score"
        :wrongWords="result.wrongWords"
        :title="title"
        @close="closeDialog()"
        @main="moveToMain()"
    >
    </VocaInfoDialog>
  </template>

<!--  <v-alert-->
<!--      color="info"-->
<!--      title="Word-Game result"-->
<!--      text="{{ result.score }}"-->
<!--  ></v-alert>-->
</template>

<script>

import {useWordGameStore} from "@/stores/useWordGameStore";
import VocaInfoDialog from "@/components/VocaInfoDialog.vue";
import router from "@/router/router";

export default {
  components: {VocaInfoDialog},
  mounted() {
    this.init();
  },
  data() {
    return {
      words: [],
      result: {
        score: '',
        wrongWords: [],
        incorrect: [],
      },
      title: '단어 게임 결과',
      dialog: false,
    }
  },
  methods: {
    init() {
      const store = useWordGameStore();
      const words = store.getWords;
      this.words = words;
      console.log(this.words);
    },
    submit() {
      let count = 0;
      let wrongWords = new Array();
      let incorrect = [];
      for(const word of this.words) {
        if(word.definition == word.text) {
          count++;
        } else {
          wrongWords.push(word.word);
          incorrect.push(word.num);
        }
      }

      for(const id of incorrect) {
        this.words[id].isWrong = true;
      }

      this.result.score = count + " / " + this.words.length;
      this.result.wrongWords = wrongWords;
      this.result.incorrect = incorrect;
      this.showResult();

    },
    showResult() {
      this.score = this.result.score;
      for(const wrongWord of this.result.wrongWords) {
        this.score += wrongWord.word + '<br>';
      }
      this.dialog = true;
    },
    closeDialog() {
      console.log("실행됨.");
      this.dialog = false;
    },
    moveToMain() {
      console.log("실행됨.");
      router.push('/');
    }
  }
}
</script>

<style scoped>

</style>