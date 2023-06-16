<template>
  <h2 class="ma-5">비밀번호 찾기</h2>
  <v-text-field
      v-model="email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="E-mail"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
  ></v-text-field>
  <v-btn
      class="me-4 float-end"
      @click="sendEmail"
  >
    메일 인증
  </v-btn>
</template>

<script>

import {reactive} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  setup () {
    const initialState = {
      email: '',
    }

    const state = reactive({
      ...initialState,
    })

    const rules = {
      email: { required, email },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  data() {
    return {
      email: ""
    }
  },
  methods: {
    sendEmail() {

    }
  }
}
</script>

<style scoped>

</style>