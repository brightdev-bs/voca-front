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

import {useWordStore} from "@/stores/useWordStore";
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
      const store = useWordStore();
      const words = store.getWords;
      this.words = words;
    },
    submit() {
      let count = 0;
      let wrongWords = new Array();
      let incorrect = [];
      for(let i = 0; i < this.words.length; i++) {
        const word = this.words[i];
        console.log("words[i] : ", word);

        let correctFlag = false;

        // 정규식을 이용해 () [], 띄어쓰기 무시한다.
        // https://regexr.com/
        if(word.definition && word.text) {
          const def = word.definition.replace(/\s|^\[.*\]|\(.*\)/g, '');
          const txt = word.text.replace(/\s|^\[.*\]|\(.*\)/g, '');

          if (def === txt) {
            correctFlag = true;
            this.words[i].isWrong = false;
            count++;
            continue;
          }

          const defArr = new Set(def.split(","));
          const txtArr = txt.split(",");

          for (const text of txtArr) {
            if (defArr.has(text)) {
              correctFlag = true;
              this.words[i].isWrong = false;
              count++;
            }
          }
        }

        if(correctFlag === false) {
          wrongWords.push(word.word);
          incorrect.push(i);
        }
      }

      // 로직이
      for(const id of incorrect) {
        console.log(id);
        console.log(this.words[id]);
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
      this.dialog = false;
    },
    moveToMain() {
      router.push('/');
    }
  }
}
</script>

<style scoped>

</style>