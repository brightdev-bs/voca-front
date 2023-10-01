<template>
  <p class="text-center mb-1 font-weight-bold" >Flip the card by clicking on it</p>
  <VocaCard
      :current="current"
      :is-definition="this.isDefinition"
      @toggleDefinition="toggleDefinition"
  />
  <v-row>
    <v-col cols="12" class="text-center">
      <v-btn size="small" @click="next">Next</v-btn>
    </v-col>
  </v-row>

</template>

<script>

import {useWordStore} from "@/stores/useWordStore";
import VocaCard from "@/components/voca/VocaCard.vue";

let index = 0;
export default {
  components: { VocaCard },
  data() {
    return {
      words: [],
      current: {
        word: '',
        definition: '',
        note: '',
      },
      isDefinition: false,
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
      this.current.word = word.word;
      this.current.definition = word.definition;
      this.current.note = word.note;
    },
    toggleDefinition() {
      this.isDefinition = !this.isDefinition;
    },
  }
}
</script>

<style scoped>

</style>