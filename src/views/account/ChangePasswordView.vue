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

  <LoadingAlert :loading="loading"/>

</template>

<script>

import {useVuelidate} from "@vuelidate/core";
import {minLength, required, sameAs} from "@vuelidate/validators";
import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import LoadingAlert from "@/components/common/LoadingAlert.vue";

export default {
  components: {LoadingAlert},
  setup() {
    const v$ = useVuelidate();
    const { loading, dateExecute } = useAxios(
        '/v1/password',
        {
          method: 'post',
        },
        {
          immediate: false,
          onSuccess: () => {
            alert("password is changed");
            window.location.href = process.env.VUE_APP_ADDRESS + "/login";
          },
          onError: err => {
            alert(err.response.data.data);
          }
        },
    );

    const initialState = {
      loading: loading,
      execute: dateExecute,
    };

    const state = reactive({
      ...initialState,
    })


    return { v$, state }
  },
  data() {
    return {
      password: '',
      password2: '',
      show: false,
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

        const data = {
          password: this.password,
          password2: this.password2,
          token: token,
        }

        this.state.execute(data);
      }
    }
  }
}
</script>

<style scoped>

</style>