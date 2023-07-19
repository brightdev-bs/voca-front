<template>
  <h2 class="mb-2">Create Community</h2>
  <v-text-field
      v-model="state.form.name"
      :error-messages="v$.form.name.$errors.map(e => e.$message)"
      @input="v$.form.name.$touch"
      @blur="v$.form.name.$touch"
      required
      label="community-name"
      variant="solo"
  />

  <v-text-field
      label="community-description"
      variant="solo"
      v-model="state.form.description"
  />

<!--  <v-select-->
<!--      label="total member"-->
<!--      v-model="state.form.total"-->
<!--      :error-messages="v$.form.total.$errors.map(e => e.$message)"-->
<!--      @input="v$.form.total.$touch"-->
<!--      @blur="v$.form.total.$touch"-->
<!--      :items="[5, 7, 8, 10, 20, 30, 40, 50]"-->
<!--      required-->
<!--      variant="solo"-->
<!--  ></v-select>-->

<!--  <v-checkbox-->
<!--      label="Public"-->
<!--      v-model="state.form.isPublic"-->
<!--  />-->

  <div class="d-flex">
    <v-btn class="me-2 ml-auto" @click="createCommunity">submit</v-btn>
  </div>

</template>

<script>

import {useAxios} from "@/composables/useAxios";
import {reactive, toRefs} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import { Response } from "@/global/constants"

export default {
  setup () {
    const { loading, dateExecute } = useAxios(
        'v1/community/form',
        {
          method: 'post',
          headers: {
            "Content-Type": 'application/json',
            Authorization: localStorage.getItem("token"),
          },
        },
        {
          immediate: false,
          onSuccess: () => {
            alert(Response.SUCCESS);
            location.href = "/";
          },
          onError: err => {
            alert(err.response.data.data);
          }
        },
    );

    const initialState = {
      form: {
        name: '',
        description: '',
        total: 1000,
        isPublic: true,
      },
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    const rules = {
      form: {
        name: { required },
        // total: { required }
      }
    }

    const v$ = useVuelidate(rules, state)

    return {
      ...toRefs(state),
      state,
      v$ }
  },
  methods: {
    async createCommunity() {
      const isFormCorrect = await this.v$.$validate()
      if(isFormCorrect) {
        const data = this.state.form
        this.state.execute(data);
      }
    }
  }
}
</script>

<style scoped>

</style>