<template>
  <h2>| Requested |</h2>
  <PostCardConfirm
      v-for="request in state.memberRequest"
      :key="request.id"
      :info="request"
      @rejectUser="rejectUser(request.id)"
      @acceptUser="acceptUser(request.id)"
  />
  <LoadingAlert :loading="loading"/>
</template>

<script>

import PostCardConfirm from "@/components/PostCardConfirm.vue";
import {useRoute} from "vue-router";
import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import LoadingAlert from "@/components/LoadingAlert.vue";
import { Response } from "@/global/constants"

export default {
  components: {LoadingAlert, PostCardConfirm},
  setup () {
    const route = useRoute();
    const { loading, dateExecute } = useAxios(
        'v1/community/' + route.params.communityId + '/members',
        {
          method: 'get',
          headers: {
            "Content-Type": 'application/json',
            Authorization: localStorage.getItem("token"),
          },
        },
        {
          immediate: true,
          onSuccess: res => {
            console.log(res);
            state.memberRequest = res.data.data;
          },
          onError: err => {
            console.log(err);
          }
        },
    );

    const initialState = {
      memberRequest: {},
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    return {
      state,
    }
  },
  methods: {
    rejectUser(id) {
      const { dateExecute } = useAxios(
          'v1/community/' + this.$route.params.communityId + '/members/' + id,
          {
            method: 'post',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: true,
            onSuccess: () => {
              alert(Response.SUCCESS);
              location.reload();
            },
            onError: err => {
              console.log(err);
            }
          },
      );

      dateExecute()
    },
    acceptUser(id) {
      const { dateExecute } = useAxios(
          'v1/community/' + this.$route.params.communityId + '/members/' + id,
          {
            method: 'post',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: true,
            onSuccess: () => {
              alert(Response.SUCCESS);
              location.reload();
            },
            onError: err => {
              console.log(err);
            }
          },
      );

      const form = {
        accept : true,
      }

      dateExecute(form)
    },
  }
}
</script>

<style scoped>

</style>