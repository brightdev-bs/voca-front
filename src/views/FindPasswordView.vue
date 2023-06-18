<template>
  <h2 class="ma-5">비밀번호 찾기</h2>
  <v-text-field
      v-model="state.email"
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

  <ErrorAlert
      :flag="this.error.flag"
      :message="this.error.message"
  />

  <ProgressCircular :loading="this.loading"/>

</template>

<script>

import {reactive} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import axios from "axios";
import ErrorAlert from "@/components/ErrorAlert.vue";
import ProgressCircular from "@/components/ProgressCircular.vue";

export default {
  components: {ProgressCircular, ErrorAlert},

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
      error: {
        flag: false,
        message: '',
      },
      loading: false,
    }
  },
  methods: {
    async sendEmail() {
      const isFormCorrect = await this.v$.$validate()
      console.log(isFormCorrect);
      if(isFormCorrect) {
        this.loading = true;
        axios
            .get(this.server + '/v1/password?email=' + this.state.email, {
              headers: {
                "Content-Type": 'application/json',
              }
            })
            .then(() => {
              alert("메일을 확인해주세요");
              window.location.href = this.domain + "/login";
            })
            .catch(err => {
              console.log(err);
              const errorMsg = err.response.data.data;
              this.error.flag = true;
              this.error.message = errorMsg;
            })
      }
    }
  }
}
</script>

<style scoped>

</style>