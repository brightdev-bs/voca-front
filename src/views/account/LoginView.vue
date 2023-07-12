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

    <LoadingAlert :loading="loading"/>

  </form>
</template>

<script>
import {reactive, toRefs} from "vue";
import {email, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAxios} from "@/composables/useAxios";
import LoadingAlert from "@/components/LoadingAlert.vue";

export default {
  components: {LoadingAlert},

  setup () {
    const { loading, dateExecute } = useAxios(
        'v1/login',
        {
          method: 'post',
        },
        {
          immediate: false,
          onSuccess: res => {
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('name', res.data.data.username)
            localStorage.setItem('id', res.data.data.id)
            location.href = process.env.VUE_APP_ADDRESS;
          },
          onError: err => {
            alert(err.response.data.data + " check the email");
          }
        },
    );

    const initialState = {
      email: '',
      password: '',
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(8)}
    }

    const v$ = useVuelidate(rules, state)

    return {
      ...toRefs(state),
      state,
      v$ }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {

    async login() {
      const isFormCorrect = await this.v$.$validate()
      if(isFormCorrect) {

        let data = {
          email: this.state.email,
          password: this.state.password,
        }

        this.state.execute(data);
      }
    },
  }
}
</script>

<style scoped>

</style>