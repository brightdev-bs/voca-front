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
      <h3 class="ma-3">이전 공부 내역</h3>
      <v-date-picker
          v-model="selectedDate"
          is-expanded
          @dayclick="onDayClick"
          :attributes='attributes'
          :max-date="new Date()"
      />
    </div>

    <div>
      <h3 class="ma-3">내 단어장</h3>
      <v-card
          class="mx-auto"
      >
        <v-list
            v-model="selectedVoca"
            :items="this.vocabulary"
            item-title="name"
            item-value="id"
            @click:select="openVocabulary"
        ></v-list>
      </v-card>
    </div>

    <v-dialog
        v-model="vocaClicked"
        persistent
        width="500">
      <v-card>
        <v-card-text>{{ selectedVoca.value }}에 저장한 단어를 복습하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green-darken-1"
              variant="text"
              @click="vocaPopupClikced(false)"
          >
            Disagree
          </v-btn>
          <v-btn
              color="green-darken-1"
              variant="text"
              @click="vocaPopupClikced(true)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dateClicked"
        persistent
        width="500">
      <v-card>
        <v-card-text>{{ selectedDate }}에 공부한 단어를 복습하시겠습니까?</v-card-text>
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

            const vocabularies = res.data.data.vocabularyList;
            for(let voca of vocabularies) {
              this.vocabulary.push(voca);
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
      selectedDate: null,
      dateClicked: false,
      vocabulary: [],
      selectedVoca: null,
      vocaClicked: false,
    }
  },
  methods: {
    onDayClick() {
      this.selectedDate = moment(this.selectedDate).format('YYYY/MM/DD');
      console.log(moment(this.selectedDate, 'YYYY.MM.DD').format());
      this.dateClicked = true;
    },
    choose(flag) {
      if(flag) {
        location.href = this.domain + '?date=' + this.selectedDate;
      } else {
        this.dateClicked = false;
      }
      this.selectedDate = null;
    },
    openVocabulary(selected) {
      for(const voca of this.vocabulary) {
        if(voca.id == selected.id) {
          this.selectedVoca = {
            key: voca.id,
            value: voca.name
          }
        }
      }
      this.vocaClicked = true;
    },
    vocaPopupClikced(flag) {
      if(flag) {
        location.href = this.domain + '?voca=' + this.selectedVoca.key;
      } else {
        this.vocaClicked = false;
      }
    }
  }
}
</script>

<style scoped>

</style>