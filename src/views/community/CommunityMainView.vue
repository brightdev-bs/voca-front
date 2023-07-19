<template>

  <div class="d-flex">
    <v-btn
        class="ml-auto me-3 mb-2"
        color="indigo"
        icon="mdi-note-edit-outline"
        @click="writePost()"
    ></v-btn>

  </div>
  <hr class="mb-2">

  <div v-for="(post, index) in state.posts"
       :key="post.id"
       class="mb-5">
    <p class="me-4" @click="showComment()">
      <v-icon icon="mdi-account-outline"></v-icon>
      {{ post.writer }}
    </p>
    <ReadOnlyEditor
        :editor-data="post.content"
        :editor-disabled="true"
    />
    <v-card>
      <v-card-actions class="float-end me-2">
        <p class="me-4" @click="showComment(index)">
          <v-icon icon="mdi-comment-outline"></v-icon>
          {{ post.comments.length }}
        </p>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import ReadOnlyEditor from "@/components/community/OptionEditor.vue";
import {usePostStore} from "@/stores/usePostStore";
import router from "@/router/router";

export default {
  components: {ReadOnlyEditor},
  setup () {
    const route = useRoute();
    const { loading, dateExecute } = useAxios(
        'v1/community/' + route.params.id + '/posts',
        {
          method: 'get',
        },
        {
          immediate: true,
          onSuccess: res => {
            const data = res.data.data;

            if(data.length === 0){
              state.empty = true;
            }

            state.posts = data;
            for(let index in state.posts) {
              state.posts[index].isOpen = false;
            }
          },
          onError: err => {
            alert(err.response.data.data);
          }
        },
    );

    const initialState = {
      posts: [],
      empty: false,
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
      isLogin: true,
    }
  },
  methods: {
    writePost() {
      if(!localStorage.getItem("id")) {
        alert('login first');
        location.href = '/login';
        return;
      }
      location.href = '/community/' + this.$route.params.id + '/posts'
    },
    showComment(id) {
      const store = usePostStore();
      store.setPost(this.state.posts[id]);
      router.push('/community/' + this.$route.params.id + '/posts/' + this.state.posts[id].id)
    }
  }
}
</script>

<style scoped>
h2 {
  color: #448AFF
}
</style>
