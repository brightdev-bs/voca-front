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
      <h3 class="ma-3">Study record</h3>
      <v-date-picker
          v-model="selectedDate"
          is-expanded
          @dayclick="onDayClick"
          :attributes='attributes'
          :max-date="new Date()"
      />
    </div>

    <VocabularyList
        :title="'My Vocabularies'"
        :vocabulary="vocabulary"
        @openVocabulary="openVocabulary"
        class="mt-5"
    />

    <VocabularyList
        :title="'Liked Vocabularies'"
        :vocabulary="likedVocabulary"
        @openVocabulary="openLikedVocabulary"
        class="mt-5"
    />

    <v-dialog
        v-model="vocaClicked"
        persistent
        width="500">
      <v-card>
        <v-card-text>Do you want to review {{ selectedVoca.value }} ?</v-card-text>
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
        <v-card-text>Do you want to review the words you studied on {{ selectedDate }} ?</v-card-text>
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
import moment from "moment";
import {Error} from "@/global/constants";
import {useAxios} from "@/composables/useAxios";
import {reactive, toRefs} from "vue";
import VocabularyList from "@/components/voca/VocabularyList.vue";

export default {
  components: {VocabularyList},

  setup () {
    const { loading, dateExecute } = useAxios(
        '/v1/my-page',
        {
          method: 'get',
          headers: {
            Authorization: localStorage.getItem("token")
          },
        },
        {
          immediate: false,
          onSuccess: res => {
            state.profile.username = res.data.data.user.username;
            state.profile.email = res.data.data.user.email;
            const records = res.data.data.dates;
            for (let i = 0; i < records.length; i++) {
              state.attributes[0].dates.push(new Date(records[i]).toLocaleDateString());
            }

            const vocabularies = res.data.data.vocabularyList;
            for (let voca of vocabularies) {
              console.log(voca);
              if (voca.type === 'CREATED')
                state.myVocabulary.push(voca);
              else
                state.likedVocabulary.push(voca);
            }
          },
          onError: err => {
            const errorMsg = err.response.data.data
            if (errorMsg === Error.EXPIRED_TOKEN || errorMsg === Error.NOT_FOUND_TOKEN || errorMsg === Error.INVALID_TOKEN) {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              location.href = process.env.VUE_APP_ADDRESS + "/login";
            }
          },
        },
    );

    const initialState = {
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
      myVocabulary: [],
      likedVocabulary: [],
      selectedVoca: null,
      vocaClicked: false,
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    return {
      ...toRefs(state),
      state,
    }
  },
  mounted() {

    let token = localStorage.getItem("token");

    if(token == undefined || token == "undefined" || token == null || token == '') {
      window.location.href = this.domain + '/login';
    }

    this.state.execute();
  },

  methods: {
    onDayClick() {
      this.selectedDate = moment(this.selectedDate).format('YYYY-MM-DD');
      this.dateClicked = true;
    },
    choose(flag) {
      if(flag) {
        location.href = this.domain + '/vocabulary?date=' + this.selectedDate;
      } else {
        this.dateClicked = false;
      }
      this.selectedDate = null;
    },
    openMyVocabulary(selected) {
      for(const voca of this.myVocabulary) {
        if(voca.id == selected.id) {
          this.selectedVoca = {
            key: voca.id,
            value: voca.name
          }
        }
      }
      this.vocaClicked = true;
    },
    openLikedVocabulary(selected) {
      for(const voca of this.likedVocabulary) {
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
        location.href = this.domain + '/vocabulary?voca=' + this.selectedVoca.key;
      } else {
        this.vocaClicked = false;
      }
    }
  }
}
</script>

<style scoped>

</style>