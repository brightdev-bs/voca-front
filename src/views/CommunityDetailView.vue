<template>
  <h2>Today's Topic</h2>
  <div class="d-flex justify-center mb-6 bg-indigo-lighten-4">
    <h3> Introduce yourself </h3>
  </div>

  <div>
    <h2 class="d-inline-block">Posts</h2>
    <v-btn class="float-end me-3" @click="write = !write">Write</v-btn>
  </div>
  <hr class="ma-4">

  <!-- 동적으로 나타나는 글쓰기 UI -->
  <div v-if="write">
    <v-textarea
        v-model="postContent"
        bg-color="amber-lighten-4"
        color="orange orange-darken-4"
        label="Label"
    />
    <div class="d-flex">
      <v-btn class="mb-5 ml-auto" @click="submitPost">submit</v-btn>
    </div>
  </div>

  <!-- posts -->
  <div>
    <v-row
        v-for="post in state.posts"
        :key="post.id"
    >
      <!-- posts -->
      <v-col cols="12" sm="6">
        <PostCard
            :post="post"
            class="mb-3"/>
      </v-col>


      <!-- comment posts -->
      <v-col
          cols="12"
          sm="6"
      >

        <!-- dynamic comment form -->
        <v-col
            class="pa-0"
            v-if="post.commentShow">
          <v-textarea
              v-model="commentContent"
              color="orange orange-darken-4"
              label="Comment"
              rows="4"
          />
          <div class="d-flex">
            <v-btn
                class="mb-5 ml-auto"
                @click="submitComment(post.id)"
            >
              submit
            </v-btn>
          </div>
        </v-col>

        <v-card
            v-for="comment in post.comments"
            :key="comment.id"
            class="mx-auto mb-2"
            color="#white"
            theme="black"
            max-width="400"
        >

          <v-card-text class="text-h7 py-2">
            {{ comment.content }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="w-100">

              <v-list-item-subtitle>{{ comment.writer }}</v-list-item-subtitle>

            </v-list-item>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </div>

</template>

<script>

import PostCard from "@/components/PostCard.vue";
import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import {Response as response} from "@/global/constants";

export default {
  components: {PostCard},
  setup () {
    const route = useRoute();
    const { loading, dateExecute } = useAxios(
        'v1/community/' + route.params.id,
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
            console.log(res)
            let datas = res.data.data;
            for(let d of datas) {
              d.commentShow = false;
            }
            state.posts = res.data.data;
          },
          onError: err => {
            alert(err);
          }
        },
    );

    const initialState = {
      posts: [],
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    return { state }
  },

  data() {
    return {
      write: false,
      comment: false,
      postContent: '',
      commentContent: '',
    }
  },
  methods: {
    submitPost() {
      if(!this.postContent.trim()) {
        alert("There is nothing to post")
        return;
      }

      const communityId = this.$route.params.id;

      let { submitExecute } = useAxios(
          'v1/community/' + communityId + '/posts',
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
              alert(response.SUCCESS);
              window.location.reload();
            },
            onError: err => {
              alert(err);
            }
          },
      );

      const form = {
        postContent: this.postContent,
      }

      submitExecute(form);
    },
    submitComment(postId) {
      let form = {
        commentContent: this.commentContent,
      }
      console.log(form);
      let { submitExecute } = useAxios(
          'v1/posts/' + postId + '/comments',
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
              alert(response.SUCCESS);
              window.location.reload();
            },
            onError: err => {
              alert(err);
            }
          },
      );

      submitExecute(form);

    },
  }
}
</script>

<style scoped>

</style>