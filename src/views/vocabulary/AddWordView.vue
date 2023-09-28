<template>

  <section class="ma-5">
    <WordForm
        :category="category"
        :updateValue="this.select"
        :is-open="this.vocaView"
        :voca-form="this.voca"
        :word-form="this.wordForm"
        :button-action="this.buttonAction"
        @updateWord="updateWord"
        @updateDefinition="updateDefinition"
        @updateNote="updateNote"
        @openCategory="openVocaFormPopup"
        @updateCategory="updateVocabulary"
        @addVocabulary="addVocabulary"
        @addWord="addWord"
        @cancel="closePopup"
        @updateVocaName="updateVocaName"
        @updateVocaDescription="updateVocaDescription"
    />

    <LoadingAlert :loading="loading"/>
  </section>

</template>

<script>

import {useAxios} from "@/composables/useAxios";
import moment from "moment/moment";
import LoadingAlert from "@/components/common/LoadingAlert.vue";
import WordForm from "@/components/voca/WordForm.vue";


export default {
  components: {
    WordForm,
    LoadingAlert
  },
  mounted() {
    this.initVocaList();
    const word = this.$route.params.word;
    if(word) {
      this.wordForm = JSON.parse(word);
      this.select = this.wordForm.vocabularyId
      this.buttonAction = 'edit'
    }
  },
  data() {
    return {
      vocaView: false,
      select: '',
      category: [
          { name: 'create new vocabulary', key: "add"}
      ],
      loading: false,
      voca: {
        name: '',
        description: '',
        isPublic : true,
      },
      wordForm: {
        word: '',
        definition: '',
        note: '',
      },
      buttonAction: 'add',
    }
  },
  methods: {
    addWord(word, action) {
      if(action === 'add') {
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

        word.vocaId = this.select;
        word.date = moment().format("yyyy-MM-DD");

        this.loading = true;
        dateExecute(word);
      } else {
          const {dateExecute} = useAxios(
              'v1/words/' + word.id,
              {
                method: 'put',
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

          word.vocaId = this.select;
          word.date = moment().format("yyyy-MM-DD");

          this.loading = true;
          dateExecute(word);
        }
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
      const name = voca.name.trim();
      const desc = voca.description.trim();
      const isPublic = voca.isPublic;
      for(const value of this.category) {
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
              this.category.unshift({name: name, key: res.data.data.id});
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
    },
    updateVocaName(name) {
      this.voca.name = name;
    },
    updateVocaDescription(desc) {
      this.voca.description = desc;
    },
    updateWord(word) {
      this.wordForm.word = word;
    },
    updateDefinition(def) {
      this.wordForm.definition = def;
    },
    updateNote(note) {
      this.wordForm.note = note;
    },

  }

}

</script>

<style scoped>

</style>