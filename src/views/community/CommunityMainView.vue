<template>
  <h2 class="mb-1"> {{ state.community.name }} </h2>
  <p class="ms-5 mb-2">  {{ state.community.description }} </p>
  <div class="d-flex" v-if="state.community.isMaster">
    <v-btn
        class="ml-auto me-3 mb-2"
        color="purple"
        icon="mdi-account-cog-outline"
    ></v-btn>
    <div class="d-flex">
      <v-btn
          class="ml-auto me-3 mb-2"
          color="indigo"
          icon="mdi-note-edit-outline"
          @click="createTopic()"
      ></v-btn>
    </div>
  </div>

  <div class="d-flex" v-else>
    <v-btn
        v-if="!state.community.isMember"
      class="ml-auto mb-2 me-2"
      @click="joinCommunity"
    >
      Join
    </v-btn>

    <v-btn
        v-if="state.community.isMember"
        class="ml-auto me-3 mb-2"
        color="indigo"
        icon="mdi-note-edit-outline"
        @click="createTopic()"
    ></v-btn>

  </div>
  <hr class="mb-2">

  <div class="mb-5">
    <p class="me-4" @click="showComment()">
      <v-icon icon="mdi-account-outline"></v-icon>
      Vanille
    </p>
    <ReadOnlyEditor/>
    <v-card>
      <v-card-actions class="float-end me-2">
        <p class="me-4" @click="showComment()">
          <v-icon icon="mdi-comment-outline"></v-icon>
          255
        </p>
        <p class="me-4">
          <v-icon icon="mdi-thumb-up-outline"></v-icon>
          255
        </p>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import ReadOnlyEditor from "@/components/community/ReadOnlyEditor.vue";
import {Response} from "@/global/constants";

export default {
  components: {ReadOnlyEditor},
  setup () {
    const route = useRoute();
    const { loading, dateExecute } = useAxios(
        'v1/community/' + route.params.id,
        {
          method: 'get',
        },
        {
          immediate: true,
          onSuccess: res => {
            console.log(res.data)
            state.community = res.data.data;

            const loginedId = localStorage.getItem('id');
            console.log(loginedId);

            if(loginedId == state.community.createdBy) {
              console.log("isMaster");
              state.community.isMaster = true;
            } else {
              if(isMember()) {
                state.community.isMember = true;
                console.log("isMember")
              }
            }

            function isMember() {
              for (let idx in state.community.joinedMembers) {
                if (loginedId == state.community.joinedMembers[idx]) {
                  return true;
                }
              }
              return false;
            }
          },
          onError: err => {
            console.log(err);
          }
        },
    );

    const initialState = {
      community: {},
      email: '',
      password: '',
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
  data() {
    return {

    }
  },
  methods: {
    createTopic() {
      location.href = '/community/' + this.$route.params.id + '/topics'
    },
    joinCommunity() {

      const token = localStorage.getItem('token');
      if(!token) {
        const b = confirm("Please login first");
        if(b) {
          location.href = '/login';
          return;
        }
        else return;
      }

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

      submitExecute();
    },
    manageMemberPage() {
      location.href = '/community/' + this.$route.params.id + '/members';
    },
    showComment() {

    }
  }
}
</script>

<style scoped>
h2 {
  color: #448AFF
}
</style>
