<template>
  <p class="text-center mb-1 font-weight-bold" >Flip the card by clicking on it</p>
  <VocaCard
      :current="current"
      :is-definition="this.isDefinition"
      @toggleDefinition="toggleDefinition"
  />
  <v-row>
    <v-col cols="12" class="text-center">
      <v-btn class="mb-2" size="small" @click="next">Next</v-btn>
      <v-btn class="ml-2 mb-2" size="small" @click="addToMyList">Add To Today's List</v-btn>
    </v-col>
  </v-row>
  <vue-alert
      :show-alert="showAlert"
      :is-correct="isCorrect"
      :success-title="'Success'"
      :error-title="'Error'"
  />

</template>

<script>

import {useWordStore} from "@/stores/useWordStore";
import VocaCard from "@/components/voca/VocaCard.vue";
import {useAxios} from "@/composables/useAxios";
import moment from "moment";
import VueAlert from "@/components/common/VueAlert.vue";
export default {
  components: {VueAlert, VocaCard },
  data() {
    return {
      words: [],
      current: {
        word: '',
        definition: '',
        note: '',
      },
      isDefinition: false,
      index: 0,
      showAlert: false,
      isCorrect: false,
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
      if(this.words.length <= this.index) {
        alert("The study section is finished !")
        this.index = 0;
      }

      const word = this.words[this.index++];
      this.current.word = word.word;
      this.current.definition = word.definition;
      this.current.note = word.note;
    },
    toggleDefinition() {
      this.isDefinition = !this.isDefinition;
    },
    addToMyList() {
      const word = this.words[this.index - 1];
      const form = {
        word: word.word,
        definition: word.definition,
        note: word.note,
        date: moment().format("yyyy-MM-DD")
      }
      const { submitExecute } = useAxios(
          'v1/words',
          {
            method: 'post',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: false,
            onSuccess: () => {
              this.isCorrect = true;
              this.showAlert = true;
              this.hideAlert();
            },
            onError: () => {
              this.isCorrect = false;
              this.showAlert = true;
              this.hideAlert();
            }
          },
      );
      submitExecute(form);
    },
    hideAlert() {
      setTimeout(() => {
        this.showAlert = false;
      }, 700);
    },
  },
  head() {
    return {
      title: "Study Vocabulary",
      meta: [
        { name: 'description', content: 'Study Vocabulary And Add Famous Words For Your Test' },
        { name: 'keywords', content: 'Vocabulary, Study' },
      ],
    }
  }
}
</script>

<style scoped>

</style>