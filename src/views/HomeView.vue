<template>
  <div class="ma-5">
    <v-row>
      {{ this.date }}
    </v-row>
    <v-row justify="end">
      <v-btn size="small" class="float-right me-1" @click="hideDefinition">{{ hideButton }}</v-btn>
      <v-btn size="small" href="/words/new" class="float-right me-1" v-if="isToday">추가하기</v-btn>
      <v-btn size="small" @click="setWordGame" class="float-right">단어 게임</v-btn>
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
import VocaTable from "@/components/VocaTable";
import axios from "axios";
import moment from "moment";
import VocaFooter from "@/components/VocaFooter.vue";
import {useWordGameStore} from "@/stores/useWordGameStore";
import router from "@/router/router";

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
      hideButton: '뜻 숨기기',
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

      if(day || !voca) {
        date = moment();
        if(day == 'today' || !day) {
          this.date = '오늘 공부할 단어';
          date = moment();
        } else if(day == 'yesterday') {
          this.date = '어제 공부한 단어';
          date = moment().subtract(1, 'days');
        } else if(day == 'week') {
          this.date = '일주일 전 공부한 단어';
          date = moment().subtract(7, 'days');
        } else if(day == 'month') {
          this.date = '한달 전 공부한 단어';
          date = moment().subtract(1, 'months');
        } else {
          date = moment(day, 'YYYY/MM/DD')
          this.date = date.format('YYYY/MM/DD')
        }


        axios
            .get(this.domain + '/api/v1/words', {
              params: {
                date: date.format("YYYY-MM-DD HH:mm:ss"),
              },
              headers: {
                "Content-Type": 'application/json',
                Authorization: localStorage.getItem("token"),
              },

            })
            .then(res => {
              console.log(res);
              let id = 0;
              res.data.data.words.forEach(w => {
                w.num = id++;
                w.isHidden = false
                w.isWrong = false
              });
              this.words = res.data.data.words;
            })
            .catch(err => {
              const errorMsg = err.response.data.data
              if(errorMsg == '만료된 토큰입니다.' || errorMsg == '토큰이 없습니다.') {
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                location.href = this.domain + '/login';
              }
            })
      }

      if(voca) {
        date = voca;
        axios
            .get(this.domain + '/api/v1/voca/words', {
              params: {
                voca: voca,
              },
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
              if(errorMsg == '만료된 토큰입니다.' || errorMsg == '토큰이 없습니다.') {
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                location.href = this.domain + '/login';
              }
            })

      }
    },
    checkDate() {
      let date = this.$route.query.date;
      if(date == 'today' || !date) return true;
      else return false;
    },
    hideDefinition() {
      if(this.hideButton == '뜻 숨기기') {
        this.hideButton = '뜻 보이기';
        this.words.forEach(w => w.isHidden = true)
      } else {
        this.hideButton = '뜻 숨기기';
        this.words.forEach(w => w.isHidden = false)
      }
    },
    changeHideStatus(id) {
      let word = this.words.at(id);
      word.isHidden = !word.isHidden;
    },
    setWordGame() {
      const store = useWordGameStore();
      store.setWords(this.words);
      router.push('/word-game');
    }
  }
}
</script>

<style scoped>

</style>