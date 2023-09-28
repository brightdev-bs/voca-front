<template>

  <section class="ma-5">
    <WordForm
        :category="this.category"
        :updateValue="this.select"
        @open-category="openVocaFormPopup"
        @update-category="updateVocabulary"
        @add-word="addWord"
    />

    <VocaFormPopup
        v-if="this.vocaView"
        @add-vocabulary="addVocabulary"
        @close-popup="closePopup"
    />
    <LoadingAlert :loading="loading"/>
  </section>

</template>

<script>

import {useAxios} from "@/composables/useAxios";
import moment from "moment/moment";
import LoadingAlert from "@/components/common/LoadingAlert.vue";
import WordForm from "@/components/voca/WordForm.vue";
import VocaFormPopup from "@/components/voca/VocaFormPopup.vue";


export default {
  components: {
    VocaFormPopup,
    WordForm,
    LoadingAlert
  },
  mounted() {
    this.initVocaList();
  },
  data() {
    return {
      vocaView: false,
      select: '',
      category: [
          { name: 'create new vocabulary', key: "add"}
      ],
      loading: false,
    }
  },
  methods: {
    addWord(form) {

      const { dateExecute } = useAxios(
          'v1/words',
          {
            method: 'post',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: false,
            onSuccess: () => {
              this.loading = false;
              location.href = "/vocabulary?page=1"
            },
            onError: err => {
              this.loading = false;
              alert(err);
            }
          },
      );

      form.vocaId = this.select;
      form.date = moment().format("yyyy-MM-DD");

      this.loading = true;
      dateExecute(form);
    },
    openVocaFormPopup() {
       this.vocaView = true;
       this.select = '';
    },
    closePopup() {
      this.vocaView = false;
      this.select = '';
    },
    updateVocabulary(value) {
      this.select = value;
    },
    addVocabulary(voca) {
      console.log(voca);
      const name = voca.name.trim();
      const desc = voca.description.trim();
      const isPublic = voca.isPublic;
      for(const value of this.form.category) {
        if(value.name == name) {
          alert("There is already same name of vocabulary");
          return;
        }
      }

      const { dateExecute } = useAxios(
          'v1/voca',
          {
            method: 'post',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: false,
            onSuccess: res => {
              this.form.category.unshift({name: name, key: res.data.data.id});
              this.voca.name = '';
              this.voca.description = '';
              this.vocaView = false;
            },
            onError: err => {
              alert(err);
            }
          },
      );

      const form = {
        "name": name,
        "description": desc,
        "publicFlag": isPublic,
      }

      dateExecute(form);
    },
    initVocaList() {
      const { submitExecute } = useAxios(
          'v1/voca',
          {
            method: 'get',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: false,
            onSuccess: res => {
              let response = res.data.data;
              for (const ele of response) {
                this.category.unshift({name: ele.name, key: ele.id});
              }
            },
            onError: err => {
              alert(err);
            }
          },
      );

      submitExecute();
    }
  }

}

</script>

<style scoped>

</style>