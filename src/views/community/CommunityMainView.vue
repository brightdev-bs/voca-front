<template>
  <h2 class="mb-1"> {{ state.community.name }} </h2>
  <p class="ms-5 mb-2">  {{ state.community.description }} </p>
  <div class="d-flex" v-if="state.community.isMaster">
    <v-btn
        @click="manageMemberPage"
        class="ml-auto mb-2 me-2"
    >
      Manage Member
    </v-btn>
    <div class="d-flex">
      <v-btn
          class="ml-auto mb-2 me-2"
          @click="textAreaShow = !textAreaShow"
      >
        create topic
      </v-btn>
    </div>
  </div>
  <div class="d-flex" v-else-if="state.community.isMember">
      <v-btn
          class="ml-auto mb-2 me-2"
          @click="textAreaShow = !textAreaShow"
      >
        create topic
      </v-btn>
  </div>
  <div class="d-flex" v-else>
    <v-btn
      class="ml-auto mb-2 me-2"
      @click="joinCommunity"
    >
      Join
    </v-btn>
  </div>
  <hr class="mb-2">


  <div class="d-flex" v-if="textAreaShow">
    <v-textarea
        v-model="content"
        bg-color="grey-lighten-2"
        color="cyan"
        label="Topic"
    ></v-textarea>
    <v-btn
        @click="createTopic"
        class="align-self-end mb-6 ms-1"
    >
      submit
    </v-btn>
  </div>

  <v-row>
    <v-col
        v-for="topic in state.community.topics"
        :key="topic.id"
    >
      <PostItem
          @click="moveToTopic(topic.id)"
          :title=topic.content
          width="350"
          :created-at=topic.createdAt
          class="ma-0"
      />
    </v-col>
  </v-row>
</template>

<script>

import PostItem from "@/components/PostItem.vue";
import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import {Response} from "@/global/constants";

export default {
  components: {PostItem},
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
              for (let id in state.community.joinedMembers) {
                if (loginedId == id) {
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
      textAreaShow: false,
      content: '',
    }
  },
  methods: {
    createTopic() {
      if(!this.content.trim()) {
        alert("Write Topic");
        return;
      }

      const { dateExecute } = useAxios(
          'v1/community/' + this.$route.params.id + '/topic',
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
              location.reload();
            },
            onError: err => {
              console.log(err);
            }
          },
      );

      const form = {
        content: this.content,
      }
      dateExecute(form);

    },
    joinCommunity() {
      const token = localStorage.getItem('token');
      console.log(token);
      if(!token) {
        const b = confirm("Please login first");
        console.log(b);
        if(b) {
          location.href = '/login';
          return;
        }
        else return;
      }
      location.href = '/community/' + this.$route.params.id + '/members/form'
    },
    moveToTopic(id) {
      location.href = '/community/' + this.$route.params.id + '/topics/' + id;
    },
    manageMemberPage() {
      location.href = '/community/' + this.$route.params.id + '/members';
    }
  }
}
</script>

<style scoped>
h2 {
  color: #448AFF
}
</style>
