<template>

  <section class="ma-5">
    <h3 class="ma-3">Add new word</h3>
    <v-text-field
        v-model="this.form.word"
        class="mt-3"
        label="word"
        variant="solo">
    </v-text-field>

    <v-text-field
        v-model="this.form.definition"
        label="definition"
        variant="solo">
    </v-text-field>

    <v-text-field
        v-model="this.form.note"
        label="description"
        variant="solo">
    </v-text-field>

    <v-select
        v-model="select"
        :items="this.form.category"
        item-title="name"
        item-value="key"
        variant="solo"
        label="vocabulary"
        @update:modelValue="change"
    ></v-select>

    <v-dialog
      v-model="vocaView"
      persistent
      width="480"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add new vocabulary</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                v-model="this.voca.name"
                label="Name of vocabulary"
                required>
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                  v-model="this.voca.description"
                  label="Description"
                  required>
              </v-text-field>
            </v-row>
            <v-row>
              <!--  Todo : 추후에 공개  -->
              <v-checkbox
                  v-model="this.voca.isPublic"
                  class="d-none"
                  :label=" '공개' ">
              </v-checkbox>
            </v-row>
          </v-container>
        </v-card-text>

        <!--  단어장 추가  -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="this.vocaView = false"
          >
            cancel
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="addVocabulary"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn class="float-right" @click="addWord">add</v-btn>

    <LoadingAlert :loading="loading"/>
  </section>

</template>

<script>

import {useAxios} from "@/composables/useAxios";
import moment from "moment/moment";
import LoadingAlert from "@/components/common/LoadingAlert.vue";


export default {
  components: {
    LoadingAlert
  },
  mounted() {
    this.initVocaList();
  },
  data() {
    return {
      vocaView: false,
      select: '',
      categories: [],
      form: {
        word: '',
        definition: '',
        note: '',
        category: [
            { name: 'create new vocabulary', key: "add"}
        ],
      },
      voca: {
        name: '',
        description: '',
        isPublic : true,
      },
      loading: false,
    }
  },
  methods: {
    addWord() {

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

      const form = this.form;
      form.vocaId = this.select;
      form.date = moment().format("yyyy-MM-DD");

      this.loading = true;
      dateExecute(form);
    },
    change(event) {
      if(event == 'add') {
       this.vocaView = true;
       this.select = '';
      }
    },
    addVocabulary() {
      const name = this.voca.name.trim();
      const desc = this.voca.description.trim();
      const isPublic = this.voca.isPublic;
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
        "isPublic": isPublic,
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
                this.form.category.unshift({name: ele.name, key: ele.id});
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