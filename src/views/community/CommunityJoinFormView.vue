<template>
  <h3>| Request Form |</h3>
  <v-container>
    <v-textarea
        v-model="introduction"
        bg-color="#E0E0E0"
        color="black"
        label="Introduce yourself for the members"
    ></v-textarea>
    <div class="d-flex">
      <v-btn
          @click="submitRequestForm"
          class="ml-auto me-2"
      >
        submit
      </v-btn>
    </div>
  </v-container>
</template>

<script>

import {useAxios} from "@/composables/useAxios";
import {Response} from "@/global/constants";

export default {
  data() {
    return {
      introduction: '',
    }
  },
  methods: {
    submitRequestForm() {

      let { submitExecute } = useAxios(
          'v1/community/' + this.$route.params.communityId + '/members',
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
              alert(Response.SUCCESS)
              location.href = '/community/' + this.$route.params.communityId;
            },
            onError: err => {
              alert(err.response.data.data);
            }
          },
      );

      const form = {
        content: this.introduction,
      }

      submitExecute(form);
    }
  }
}
</script>

<style scoped>

</style>