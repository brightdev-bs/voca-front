<template>

  <section>
    <div class="d-flex">
      <h3 class="mb-3">Language Community</h3>
      <v-btn
          class="ml-auto me-3 mb-2"
          color="indigo"
          icon="mdi-note-edit-outline"
          @click="writePost()"
      ></v-btn>
    </div>

    <div v-for="(post, index) in state.posts"
         :key="post.id"
         class="mb-5">
      <ReadOnlyEditor
          :editor-data="post.content"
          :editor-disabled="true"
      />
      <v-card>
        <v-card-actions class="float-end me-2">
          <p class="me-4" @click="showComment()">
            <v-icon icon="mdi-account-outline"></v-icon>
            {{ post.writer }}
          </p>
          <p class="me-4" @click="showComment(index)">
            <v-icon icon="mdi-comment-outline"></v-icon>
            {{ post.comments.length }}
          </p>
        </v-card-actions>
      </v-card>
    </div>

  </section>
</template>

<script>

import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import ReadOnlyEditor from "@/components/editor/OptionEditor.vue";
import {usePostStore} from "@/stores/usePostStore";
import router from "@/router/router";

export default {
  components: { ReadOnlyEditor },
  setup () {
    const { loading, dateExecute } = useAxios(
        'v1/community/1/posts',
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
            state.posts = res.data.data;
            if(localStorage.getItem('token')) {
              state.isLogined = true;
            }
          },
          onError: err => {
            alert(err);
          }
        },
    );

    const initialState = {
      posts: [],
      isLogined: false,
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    return { state }
  },
  methods: {
    writePost() {
      if(!localStorage.getItem("id")) {
        alert('login first');
        location.href = '/login';
        return;
      }
      location.href = '/community/1/posts'
    },
    showComment(id) {
      const store = usePostStore();
      store.setPost(this.state.posts[id]);
      router.push('/community/1/posts/' + this.state.posts[id].id)
    },

  }
}
</script>

<style scoped>

</style>