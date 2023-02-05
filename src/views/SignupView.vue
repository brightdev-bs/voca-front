<template>
  <form class="ma-5">
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
        label="패스워드"
        required
        @input="v$.password.$touch"
        @blur="v$.password.$touch"
    ></v-text-field>


    <v-btn
        class="me-4 float-end"
        @click="signup"
    >
      submit
    </v-btn>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {email, minLength, required} from '@vuelidate/validators'
import axios from "axios";


export default {
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

        let data = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }

        axios
            .post(this.server + '/sign-up', JSON.stringify(data), {
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