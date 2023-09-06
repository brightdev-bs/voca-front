<template>
  <div class="ma-5">
    <v-row>
      {{ this.title }}
    </v-row>
    <v-row justify="end">
      <v-btn size="small" class="float-right me-1 mt-1" @click="hideDefinition">{{ hideButton }}</v-btn>
      <v-btn size="small" @click="setWordGame" class="float-right me-1 mt-1">Word Game</v-btn>
      <v-btn size="small" @click="studyWords" class="float-right me-1 mt-1">Study</v-btn>
      <v-btn size="small" href="/vocabulary/words/new" class="float-right me-1 mt-1" v-if="isToday">Add</v-btn>
    </v-row>
  </div>
  <voca-table
      :words="this.words"
      @changeHideStatus="changeHideStatus"
  ></voca-table>

  <!--      v-bind:프롭스 속성 이름="상위 컴포넌트 데이터 이름"-->
  <voca-footer @update="update"/>
</template>

<script>
import VocaTable from "@/components/VocaTable.vue";
import moment from "moment";
import VocaFooter from "@/layout/VocaFooter.vue";
import {useWordStore} from "@/stores/useWordStore";
import router from "@/router/router";
import {useAxios} from "@/composables/useAxios";


export default {
  mounted() {
    this.update();
  },
  components: {
    VocaTable,
    VocaFooter,
  },
  data() {
    return {
      hideButton: 'hide',
      isToday: this.checkDate(),
      title: 'Today I Learned',
      words: [],
    }
  },
  methods: {
    update() {

      let url;
      let params = {};

      let voca = this.$route.query.voca;
      const date = this.$route.query.date;
      if(voca) {
        this.date = '';
        url = 'v1/voca/words'
        params.voca = voca;
      } else if(date) {
        url = 'v1/words';
        params.date = date;
        params.offset = this.$route.query.offset;
      } else {
        url = 'v1/words';
        let date = moment();
        params.date = date.format("YYYY-MM-DD");
      }
      console.log(url);

      const { dateExecute } = useAxios(
          url,
          {
            method: 'get',
            params: params,
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: false,
            onSuccess: res => {
              console.log(res);
              res.data.data.words.forEach(w => {
                w.isHidden = false
                w.isWrong= false
              });
              this.words = res.data.data.words;
            },
            onError: err => {
              alert(err.data.data);
            }
          },
      );

      dateExecute();
    },
    checkDate() {
      let date = this.$route.query.date;
      if(date === 'today' || !date) return true;
      else return false;
    },
    hideDefinition() {
      if(this.isEmptyWord() === true) {
        alert("Add a word first");
        return;
      }
      if(this.hideButton === 'hide') {
        this.hideButton = 'show';
        this.words.forEach(w => w.isHidden = true)
      } else {
        this.hideButton = 'hide';
        this.words.forEach(w => w.isHidden = false)
      }
    },
    changeHideStatus(id) {
      let word = this.words.at(id);
      word.isHidden = !word.isHidden;
    },
    setWordGame() {
      if(this.isEmptyWord() === true) {
        alert("Add a word first");
        return;
      }
      this.store();
      router.push('/word-game');
    },
    studyWords() {
      if(this.isEmptyWord() === true) {
        alert("Add a word first");
        return;
      }
      this.store();
      router.push('/study')
    },
    store() {
      const store = useWordStore();
      store.setWords(this.words);
      return store;
    },

    isEmptyWord() {
      if(this.words.length == 0) {
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>

</style>