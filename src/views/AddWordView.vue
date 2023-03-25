<template>

  <section class="ma-5">
    <h3 class="ma-3">영어 단어 추가하기</h3>
    <v-text-field
        v-model="this.form.word"
        class="mt-3"
        label="영어 단어"
        variant="solo">
    </v-text-field>

    <v-text-field
        v-model="this.form.definition"
        label="뜻"
        variant="solo">
    </v-text-field>

    <v-text-field
        v-model="this.form.note"
        label="부가 설명"
        variant="solo">
    </v-text-field>

    <v-select
        v-model="select"
        :items="this.form.category"
        item-title="name"
        item-value="key"
        variant="solo"
        label="단어장"
        @update:modelValue="change"
    ></v-select>

    <v-dialog
      v-model="vocaView"
      persistent
      width="480"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">단어장 추가하기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                v-model="this.voca.name"
                label="단어장 이름"
                required>
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                  v-model="this.voca.description"
                  label="단어장 설명"
                  required>
              </v-text-field>
            </v-row>
            <v-row>
              <v-checkbox
                  v-model="this.voca.isPublic"
                  :label=" '공개' ">
              </v-checkbox>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="this.vocaView = false"
          >
            취소
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="addVocabulary"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-btn class="float-right" @click="addWord">추가하기</v-btn>
  </section>

</template>

<script>

import axios from "axios";

export default {
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
            { name: '추가하기', key: "add"}
        ],
      },
      voca: {
        name: '',
        description: '',
        isPublic : true,
      }
    }
  },
  components: {

  },
  methods: {
    addWord() {

      this.form.vocaId = this.select;

      axios
          .post(this.domain + '/api/v1/words', JSON.stringify(this.form), {
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            }
          })
          .then(res => {
            console.log(res.data.statusCode)
            if(res.data.statusCode == '200 OK') {
              location.href = this.domain;
            }

          })
          .catch(err => {
            console.log(err);
          })
    },
    change(event) {
      console.log(event);
      if(event == 'add') {
       this.vocaView = true;
       this.select = '';
      }
    },
    addVocabulary() {
      const name = this.voca.name.trim();
      const desc = this.voca.description.trim();
      const isPublic = this.voca.isPublic;
      const form = {
        "name": name,
        "description": desc,
        "isPublic": isPublic,
      }

      for(const value of this.form.category) {
        if(value.name == name) {
          alert("이미 같은 이름의 단어장이 존재합니다.");
          return;
        }
      }

      axios
          .post(this.domain + '/api/v1/voca', JSON.stringify(form), {
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            }
          })
          .then(res => {
            console.log(res.data.statusCode)
            console.log(res.data);
            if(res.data.statusCode == '201 CREATED') {
              console.log(res.data.data.id)

              this.form.category.unshift({name: name, key: res.data.data.id});
              this.voca.name = '';
              this.voca.description = '';
              this.vocaView = false;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    initVocaList() {

      axios
          .get(this.domain + '/api/v1/voca', {
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            }
          })
          .then(res => {
            console.log(res.data.statusCode)
            if(res.data.statusCode == '200 OK') {
              let response = res.data.data;
              for (const ele of response) {
                this.form.category.unshift({name: ele.name, key: ele.id});
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
  }

}

</script>

<style scoped>

</style>