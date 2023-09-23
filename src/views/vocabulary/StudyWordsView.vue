<template>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <div v-if="!isDefinition">
        <v-card class="d-flex text-center align-center" style="height: 300px;" @click="isDefinition = !isDefinition">
          <v-card-text>
            <div>
              <h2>{{ current.word }}</h2>
              <p class="mt-2">{{ current.definition }}</p>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-card class="d-flex text-center align-center" style="height: 300px;" @click="isDefinition = !isDefinition">
          <v-card-text>
            <div>
              <h2>{{ current.definition }}</h2>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="text-center">
      <v-btn size="small" @click="next">Next</v-btn>
    </v-col>
  </v-row>

</template>

<script>

import {useWordStore} from "@/stores/useWordStore";

let index = 0;
export default {
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
    }
  }
}
</script>

<style scoped>

</style>