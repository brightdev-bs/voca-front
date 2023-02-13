<template>
  <div class="ma-5">
    {{ this.date }}
    <v-btn href="/words/new" class="float-right mx-auto">추가하기</v-btn>
  </div>
  <voca-table :words="this.words"></voca-table>

  <!--      v-bind:프롭스 속성 이름="상위 컴포넌트 데이터 이름"-->
  <voca-footer
      v-bind:propsdata="date"
      @update="update">

  </voca-footer>
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
      date: "today",
      words: [],
    }
  },
  methods: {
    update(day) {

      let date;

      if(day == 'today') {
        this.date = '오늘 공부할 단어';
        date = moment();
      }

      if(day == 'yesterday') {
        this.date = '어제 공부한 단어';
        date = moment().subtract(1, 'days');
      }

      if(day == 'week') {
        this.date = '일주일 전 공부한 단어';
        date = moment().subtract(7, 'days');
      }

      if(day == 'month') {
        this.date = '한달 전 공부한 단어';
        date = moment().subtract(1, 'months');
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
          console.log(err);
        })
    },
  }
}
</script>

<style scoped>

</style>