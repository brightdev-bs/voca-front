<template>
  <div class="ma-5">
    {{ this.date + '\'s voca' }}
    <v-btn href="/words/new" class="float-right mx-auto">추가하기</v-btn>
  </div>
  <voca-table :words="this.words"></voca-table>
</template>

<script>
import VocaTable from "@/components/VocaTable";
import axios from "axios";

export default {
  mounted() {
    this.initWords();
  },
  components: {
    VocaTable,
  },
  data() {
    return {
      date: "today",
      words: [],
    }
  },
  methods: {
    initWords() {

      const date = new Date().toISOString();

      axios
        .get(this.server + '/api/v1/words', {
          params: {
            date: date,
          },
          headers: {
            "Content-Type": 'application/json',
            Authorization: localStorage.getItem("token"),
          },

        })
        .then(res => {
          console.log(res);
          this.words = res.data.data.words;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>

</style>