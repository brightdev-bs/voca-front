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

    <LoadingAlert :loading="loading"/>
  </form>

</template>

<script>
import {reactive, toRefs} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {email, minLength, required} from '@vuelidate/validators'
import LoadingAlert from "@/components/LoadingAlert.vue";
import {useAxios} from "@/composables/useAxios";

export default {

  components: {LoadingAlert},
  data() {
    return {
      show: false,
    }
  },
  setup () {
    const { loading, dateExecute } = useAxios(
        'v1/sign-up',
        {
          method: 'post',
        },
        {
          immediate: false,
          onSuccess: () => {
            alert("회원가입이 완료되었습니다. 이메일을 확인해주세요.");
            location.href = process.env.VUE_APP_ADDRESS + "/login";
          },
          onError: err => {
            alert(err.response.data.data);
          }
        },
    );

    const initialState = {
      username: '',
      email: '',
      password: '',
      select: null,
      checkbox: null,
      loading: loading,
      execute: dateExecute,
    };

    const state = reactive({
      ...initialState,
    })

    const rules = {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(8)}
    }

    const v$ = useVuelidate(rules, state)

    return {
      ...toRefs(state),
      state,
      v$ }
  },

  methods: {
    async signup() {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {

        let form = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };

        this.state.execute(form);
      }
    }
  }

}
</script>

<style scoped>

</style>