<template>
  <div class="ma-5">
    <v-text-field
        v-model="profile.username"
        label="username"
        variant="solo"
        readonly
    />
    <v-text-field
        v-model="profile.email"
        label="email"
        variant="solo"
        readonly
    />


    <div>
      <h3>이전 공부 내역</h3>
      <v-date-picker
          v-model="selected"
          is-expanded
          @dayclick="onDayClick"
          :attributes='attributes'
          :max-date="new Date()"
      />
    </div>

    <v-dialog
        v-model="clicked"
        persistent
        width="500">
      <v-card>
        <v-card-text>{{ selected }}에 공부한 단어를 복습하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green-darken-1"
              variant="text"
              @click="choose(false)"
          >
            Disagree
          </v-btn>
          <v-btn
              color="green-darken-1"
              variant="text"
              @click="choose(true)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import 'v-calendar/dist/style.css';
import axios from "axios";
import moment from "moment";

export default {

  mounted() {

    let token = localStorage.getItem("token");
    console.log(token);
    if(token == undefined || token == "undefined" || token == null || token == '') {
      window.location.href = this.domain + '/login';
    }

    axios
        .get(this.server + '/api/v1/my-page', {
          headers: {
            "Content-Type": 'application/json',
            Authorization: localStorage.getItem("token"),
          }
        })
        .then(res => {
          console.log(res);
          if(res.data.statusCode == '200 OK') {
            console.log(res.data.data.username);
            this.profile.username = res.data.data.user.username;
            this.profile.email = res.data.data.user.email;
            const records = res.data.data.dates;
            for(let i = 0; i < records.length; i++) {
              console.log(new Date(records[i]).toLocaleDateString())
              this.attributes[0].dates.push(new Date(records[i]).toLocaleDateString());
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
  },

  data() {
    return {
      profile: {
        username: '',
        email: '',
      },
      attributes: [
        {
          dot: true,
          dates: [],
        }
      ],
      selected: null,
      clicked: false,
    }
  },
  methods: {
    onDayClick() {
      this.selected = moment(this.selected).format('YYYY/MM/DD');
      console.log(moment(this.selected, 'YYYY.MM.DD').format());
      this.clicked = true;
    },
    choose(flag) {
      if(flag) {
        location.href = this.domain + '?date=' + this.selected;
      } else {
        this.clicked = false;
      }
      this.selected = null;
    },
  }
}
</script>

<style scoped>

</style>