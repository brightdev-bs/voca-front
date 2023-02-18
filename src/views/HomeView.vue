<template>
  <div class="ma-5">
    {{ this.date }}
    <v-btn href="/words/new" class="float-right mx-auto" v-if="isToday">추가하기</v-btn>
  </div>
  <voca-table :words="this.words"></voca-table>

  <!--      v-bind:프롭스 속성 이름="상위 컴포넌트 데이터 이름"-->
  <voca-footer @update="update"/>
</template>

<script>
import VocaTable from "@/components/VocaTable";
import axios from "axios";
import moment from "moment";
import VocaFooter from "@/components/VocaFooter.vue";

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
      isToday: this.checkDate(),
      date: "today",
      words: [],
    }
  },
  methods: {
    update() {

      let date;
      let day = this.$route.query.date;

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
        .get(this.server + '/api/v1/words', {
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
          this.words = res.data.data.words;
        })
        .catch(err => {
          const errorMsg = err.response.data.data
          if(errorMsg == '토큰이 없습니다.') {
            location.href = this.domain + '/login';
          }
        })
    },
    checkDate() {
      let date = this.$route.query.date;
      console.log(date);
      if(date == 'today' || !date) return true;
      else return false;
    }
  }
}
</script>

<style scoped>

</style>