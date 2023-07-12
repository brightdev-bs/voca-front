<template>
  <h2 class="ma-5">Find password</h2>
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
    send
  </v-btn>

  <LoadingAlert :loading="loading"/>
</template>

<script>

import {reactive, ref, toRefs} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAxios} from "@/composables/useAxios";
import LoadingAlert from "@/components/LoadingAlert.vue";

export default {
  components: {LoadingAlert},

  setup () {
    const params = ref({
      email: '',
    });
    const { loading, dateExecute } = useAxios(
        '/v1/password',
        {
          params
        },
        {
          immediate: false,
          onSuccess: () => {
            alert("Check email");
            location.href = process.env.VUE_APP_ADDRESS + "/login";
          },
          onError: err => {
            alert(err.response.data.data);
          }
        },
    );

    const initialState = {
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    const rules = {
      email: { required, email },
    }

    const v$ = useVuelidate(rules, state)

    return { params, state, v$, ...toRefs(state), }
  },
  methods: {
    async sendEmail() {
      const isFormCorrect = await this.v$.$validate()
      if(isFormCorrect) {
        this.params.email = this.state.email;
        this.state.execute();
      }
    }
  }
}
</script>

<style scoped>

</style>