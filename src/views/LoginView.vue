<template>
  <form class="ma-5">
    <h2 class="ma-2">Login</h2>
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
        @input="v$.password.$touch"
        @blur="v$.password.$touch"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
    ></v-text-field>

    <v-btn
        class="me-4 float-end"
        href="/password"
    >
      find password
    </v-btn>
    <v-btn
        class="me-4 float-end"
        @click="login"
    >
      Login
    </v-btn>

    <ProgressCircular :loading="this.loading"/>

  </form>
</template>

<script>
import {reactive} from "vue";
import {email, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import axios from "axios";
import ProgressCircular from "@/components/ProgressCircular.vue";

export default {
  components: {ProgressCircular},

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
      loading: false,
    }
  },
  methods: {

    async login() {
      const isFormCorrect = await this.v$.$validate()
      if(isFormCorrect) {

        this.loading = true;

        let data = {
          email: this.state.email,
          password: this.state.password,
        }

        axios
          .post(this.server + '/v1/login', JSON.stringify(data), {
            headers: {
              "Content-Type": 'application/json',
            }
          })
          .then(res => {
            if(res.status == 200) {
              localStorage.setItem('token', res.data.data.token)
              localStorage.setItem('id', res.data.data.username)
              window.location.href = this.domain;
            }
          })
          .catch(err => {
            this.loading = false;
            const errorMsg = err.response.data.data;
            this.error.flag = true;

            if(errorMsg == Error.UNAUTHENTICATED_USER) {
              this.error.message = "인증되지 않은 사용자입니다. 이메일을 확인해주세요."
            } else{
              this.error.message = errorMsg
            }
          })
      }
    },
  }
}
</script>

<style scoped>

</style>