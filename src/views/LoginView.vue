<template>
  <form class="ma-5">
    <v-text-field
        v-model="state.email"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        label="E-mail"
        required
        @input="v$.email.$touch"
        @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
        v-model="state.password"
        :error-messages="v$.password.$errors.map(e => e.$message)"
        label="패스워드"
        required
        @input="v$.password.$touch"
        @blur="v$.password.$touch"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
    ></v-text-field>

    <v-btn
        class="me-4 float-end"
        @click="login"
    >
      Login
    </v-btn>

    <v-alert type="error" v-if="this.error.flag">
      {{ this.error.message }}
    </v-alert>

    <v-btn
        v-if="this.error.flag"
        @click="sendEmail">
      다시 보내기
    </v-btn>

  </form>
</template>

<script>
import {reactive} from "vue";
import {email, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import axios from "axios";

export default {

  setup () {
    const initialState = {
      email: '',
      password: '',
    }

    const state = reactive({
      ...initialState,
    })

    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(8)}
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data() {
    return {
      error: {
        flag: false,
        message: '',
      },
      show: false,
    }
  },
  methods: {

    async login() {
      const isFormCorrect = await this.v$.$validate()
      console.log(isFormCorrect);
      if(isFormCorrect) {

        let data = {
          email: this.state.email,
          password: this.state.password,
        }

        console.log(data);

        axios
          .post(this.server + '/api/v1/login', JSON.stringify(data), {
            headers: {
              "Content-Type": 'application/json',
            }
          })
          .then(res => {
            console.log(res);
            if(res.status == 200) {
              localStorage.setItem('token', res.data.data.token)
              localStorage.setItem('id', res.data.data.username)
              window.location.href = this.domain;
            }
          })
          .catch(err => {
            console.log(err);
            const errorMsg = err.response.data.data;
            this.error.flag = true;

            if(errorMsg == '인증되지 않은 사용자입니다.') {
              this.error.message = "인증되지 않은 사용자입니다. 이메일을 확인해주세요."
            } else{
              this.error.message = errorMsg
            }
          })
      }
    },

    sendEmail() {
      const isFormCorrect = this.v$.$validate()
      if(isFormCorrect) {

        let data = {
          email: this.state.email,
          password: this.state.password,
        }

        axios
            .post(this.server + '/api/v1/email', JSON.stringify(data), {
              headers: {
                "Content-Type": 'application/json',
              }
            })
            .then(res => {
              if(res.status == 200) {
                <v-alert type="info">메일을 확인해주세요.</v-alert>
                location.href = this.domain;
              }
            })
            .catch(err => {
              console.log(err);
            })
      }
    }
  }
}
</script>

<style scoped>

</style>