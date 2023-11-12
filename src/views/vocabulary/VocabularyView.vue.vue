<template>
  <div class="ma-5">
    <v-row>
      <h3> {{ this.title }} </h3>
      <v-spacer></v-spacer>
      <v-btn
          v-if="isVocaPage"
          class="me-1" size="small" color="primary" prepend-icon="mdi-heart" @click="addLike">Like</v-btn>
    </v-row>
    <v-row justify="end">
      <v-btn size="small" class="float-right me-1 mt-1" @click="hideDefinition">{{ hideButton }}</v-btn>
      <v-btn size="small" @click="setWordGame" class="float-right me-1 mt-1">Word Game</v-btn>
      <v-btn size="small" @click="studyWords" class="float-right me-1 mt-1">Study</v-btn>
      <v-btn size="small" to="/vocabulary/words/new" class="float-right me-1 mt-1" v-if="isToday">Add</v-btn>
    </v-row>
  </div>
  <voca-table
      :words="this.words"
      @changeHideStatus="changeHideStatus"
      @removeElement="removeElement"
  ></voca-table>

  <VuePaging
      :total-page="this.totalPage"
      :current-page="this.currentPage"
      @next-page="nextPage"
      @prev-page="prevPage"
  />

</template>

<script>
import VocaTable from "@/components/voca/VocaTable.vue";
import moment from "moment";
import {useWordStore} from "@/stores/useWordStore";
import router from "@/router/router";
import {useAxios} from "@/composables/useAxios";
import VuePaging from "@/components/common/VuePaging.vue";
import {useMeta} from "vue-meta";

export default {
  setup() {
    useMeta({
      title: '영어 단어장 모음',
      htmlAttrs: { lang: 'ko-KR', amp: true }
    })
  },
  mounted() {
    this.update();
  },
  components: {
    VuePaging,
    VocaTable,
  },
  data() {
    return {
      hideButton: 'hide',
      isToday: this.checkDate(),
      title: 'Today I Learned',
      words: [],
      currentPage: 1,
      totalPage: 1,
      isVocaPage: false,
    }
  },
  methods: {
    update() {
      const url = this.getUrl();
      const params = this.buildParams();
      console.log(params);
      if(params.voca) {
        this.title = params.voca;
      }
      this.requestWords(url, params);
    },
    getUrl() {
      let voca = this.$route.query.voca;
      if(voca) return 'v1/voca/' + voca;
      else return "v1/words";
    },
    buildParams() {
      let params = {};
      let voca = this.$route.query.voca;
      const date = this.$route.query.date;
      let page = this.$route.query.page;
      if(!page) page = 1;
      this.currentPage = page;
      params.page = page - 1;

      if(voca) {
        this.date = '';
        params.voca = voca;
        this.isVocaPage = true;
      } else if(date) {
        params.date = date;
        params.offset = this.$route.query.offset;
        this.isVocaPage = false;
      } else {
        let date = moment();
        params.date = date.format("YYYY-MM-DD");
      }

      return params;
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
    },
    nextPage(page) {
      const params = this.getParams(page);
      window.location.href = '/vocabulary?' + params;
    },
    prevPage(page) {
      const params = this.getParams(page);
      window.location.href = '/vocabulary?' + params;
    },
    getParams(page) {
      let params = '';
      const vocaId = this.$route.query.voca;
      if(vocaId) params += 'voca=' + vocaId;
      params += '&page=' + page;
      return params;
    },
    requestWords(url, params) {
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
              this.totalPage = res.data.data.totalPage;
            },
            onError: err => {
              alert(err.data.data);
            }
          },
      );

      dateExecute();
    },
    addLike() {
      const vocaId = this.$route.query.voca;
      const token = localStorage.getItem("token")
      if(!token) {
        alert('Please Login First');
        return;
      }
      const {dateExecute} = useAxios(
          'v1/voca/' + vocaId + '/liked',
          {
            method: 'post',
            headers: {
              "Content-Type": 'application/json',
              Authorization: token,
            },
          },
          {
            immediate: false,
            onSuccess: (res) => {
              alert(res.data.data);
            },
          },
      );

      dateExecute();
    },
    removeElement(index) {
      this.words.splice(index, 1);
    }
  },
}
</script>

<style scoped>

</style>