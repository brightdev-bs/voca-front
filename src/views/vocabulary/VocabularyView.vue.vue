<template>
  <div class="ma-5">
    <v-row>
      {{ this.date }}
    </v-row>
    <v-row justify="end">
      <v-btn size="small" class="float-right me-1 mt-1" @click="hideDefinition">{{ hideButton }}</v-btn>
      <v-btn size="small" @click="setWordGame" class="float-right me-1 mt-1">Word Game</v-btn>
      <v-btn size="small" @click="studyWords" class="float-right me-1 mt-1">Study</v-btn>
      <v-btn size="small" href="/words/new" class="float-right me-1 mt-1" v-if="isToday">Add</v-btn>
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
import VocaFooter from "@/components/VocaFooter.vue";
import {useWordStore} from "@/stores/useWordStore";
import router from "@/router/router";
import axios from "axios";


export default {
  mounted() {
    this.update('today');
  },
  components: {
    VocaTable,
    VocaFooter,
  },
  data() {
    return {
      hideButton: 'hide',
      isToday: this.checkDate(),
      date: "today",
      words: [],
    }
  },
  methods: {
    update() {

      let date;
      let day = this.$route.query.date;
      let voca = this.$route.query.voca;
      let url = '';
      let params = {};

      // Base case
      if(day || !voca) {
        date = moment();
        if (day === 'today' || !day) {
          this.date = 'Today I Learned';
          date = moment();
        } else {
          date = moment(day, 'YYYY/MM/DD')
          this.date = date.format('YYYY/MM/DD')
        }

        url = '/v1/words';
        params.date = date.format("YYYY-MM-DD HH:mm:ss");
      }

      // 단어장 선택해서 공부하기 했을 때
      if(voca) {
        this.date = '';
        url = '/v1/voca/words'
        params.voca = voca;
      }

      axios
          .get(this.server + url, {
            params: params,
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          })
          .then(res => {
            console.log(res);
            res.data.data.words.forEach(w => {
              w.isHidden = false
              w.isWrong= false
            });
            this.words = res.data.data.words;
          })
          .catch(err => {
            const errorMsg = err.response.data.data
            if(errorMsg === Error.EXPIRED_TOKEN || errorMsg === Error.NOT_FOUND_TOKEN) {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              location.href = this.domain + '/login';
            }
          })
    },
    checkDate() {
      let date = this.$route.query.date;
      if(date === 'today' || !date) return true;
      else return false;
    },
    hideDefinition() {
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
      this.store();
      router.push('/word-game');
    },
    studyWords() {
      this.store();
      router.push('/study')
    },
    store() {
      const store = useWordStore();
      store.setWords(this.words);
      return store;
    }
  }
}
</script>

<style scoped>

</style>