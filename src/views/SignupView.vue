<template>
  <form class="ma-5">
    <h2 class="ma-2">Sign-up</h2>
    <v-text-field
        v-model="state.username"
        :error-messages="v$.username.$errors.map(e => e.$message)"
        :counter="10"
        label="Name"
        required
        @input="v$.username.$touch"
        @blur="v$.username.$touch"
    ></v-text-field>

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
        label="password"
        required
        :type="show ? 'text' : 'password'"
        @input="v$.password.$touch"
        @blur="v$.password.$touch"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show = !show"
    ></v-text-field>


    <v-row justify="end">
      <v-btn @click="signup">
        submit
      </v-btn>
    </v-row>

    <v-row class="ma-2 pt-5">
      <v-alert v-if="this.error"
               type="error"
               title="Error"
      >
        {{ this.errorMessage }}
      </v-alert>
    </v-row>

    <v-row justify="center">
      <v-progress-circular
          v-if="loading"
          color="primary"
          indeterminate>

      </v-progress-circular>
    </v-row >
  </form>

</template>

<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {email, minLength, required} from '@vuelidate/validators'
import axios from "axios";


export default {
  data() {
    return {
      show: false,
      error: false,
      errorMessage: '',
      loading: false,
    }
  },
  setup () {
    const initialState = {
      username: '',
      email: '',
      password: '',
      select: null,
      checkbox: null,
    }

    const state = reactive({
      ...initialState,
    })

    const rules = {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(8)}
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  methods: {
    async signup() {
      const isFormCorrect = await this.v$.$validate()
      if(isFormCorrect) {

        this.loading = true;

        let data = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }

        axios
            .post(this.domain + '/api/v1/sign-up', JSON.stringify(data), {
              headers: {
                "Content-Type": 'application/json',
              }
            })
            .then(res => {
              if(res.status == 200) {
                this.loading = false;
                alert("메일을 확인해주세요.");
                location.href = this.domain;
              }
            })
            .catch(err => {
              console.log(err);
              const errorMsg = err.response.data.data;
              if(errorMsg == '이미 가입한 사용자입니다.') {
                this.errorMessage = '이미 가입한 사용자입니다.'
              }

              if(errorMsg == '이미 사용중인 이름입니다.') {
                this.errorMessage = '이미 사용중인 이름입니다.'
              }
              this.error = true;
              this.loading = false;
            })

        }
    }
  }
}
</script>

<style scoped>

</style>