<template>
  <h2 class="ma-5">Change Password</h2>
  <v-text-field
      v-model="password"
      :error-messages="v$.password.$errors.map(e => e.$message)"
      label="password"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
  ></v-text-field>
  <v-text-field
      v-model="password2"
      :error-messages="v$.password2.$errors.map(e => e.$message)"
      label="password check"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
  ></v-text-field>

  <v-btn
      class="me-4 float-end"
      @click="changePassword"
  >
    submit
  </v-btn>

  <ProgressCircular :loading="this.loading"/>
  <ErrorAlert
    :message="this.error.message"
    :flag="this.error.flag"
  />

</template>

<script>

import {useVuelidate} from "@vuelidate/core";
// import axios from "axios";
import {minLength, required, sameAs} from "@vuelidate/validators";
import axios from "axios";
import ProgressCircular from "@/components/ProgressCircular.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";

export default {
  components: {ErrorAlert, ProgressCircular},

  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      password: '',
      password2: '',
      show: false,
      loading: false,
      error: {
        message: '',
        flag: false,
      }
    }
  },
  validations() {
    return {
      password: {required, minLength: minLength(8)},
      password2: {sameAsPassword: sameAs(this.password)}
    }
  },
  methods: {
    async changePassword() {
      const result = await this.v$.$validate();

      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if(result === true && token) {

        this.loading = true;

        const data = {
          password: this.password,
          password2: this.password2,
          token: token,
        }

        axios
            .post(this.server + '/v1/password', JSON.stringify(data), {
              headers: {
                "Content-Type": 'application/json',
              }
            })
            .then(res => {
              if(res.data.data === true) {
                alert("비밀번호가 성공적으로 바뀌었습니다.");
                window.location.href = this.domain + "/login";
              } else {
                this.loading = false;
                this.error.flag = true;
                this.error.message = "비밀번호 찾기를 다시 시도해주세요.";
              }
            })
            .catch(err => {
              this.loading = false;
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