<template>
  <v-card>
    <v-card-item>
      <div class="text-h6 mb-2">
        Post
      </div>
    </v-card-item>
  </v-card>
  <ReadOnlyEditor :editor-data="postContent" class="mb-3"/>

  <v-card class="mb-2">
    <v-card-item>
      <div class="text-h6 mb-2">
        Comment
      </div>
    </v-card-item>
    <v-card-item v-for="comment in state.comments" :key="comment.id">
      <div>
        <div class="text-caption">{{ comment.writer   + ' : ' + comment.content}}</div>
      </div>
      <hr>
    </v-card-item>
  </v-card>

  <v-text-field
      v-model="comment"
      class="align-bottom"
      label="Comment"
      variant="solo"
      append-icon="mdi-send"
      @click:append="submitComment()"
  />

</template>

<script>
import ReadOnlyEditor from "@/components/editor/OptionEditor.vue";
import {useRoute} from "vue-router";
import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";
import {usePostStore} from "@/stores/usePostStore";
export default {
  components: { ReadOnlyEditor },
  setup () {
    const route = useRoute();
    const { loading, dateExecute } = useAxios(
        'v1/posts/' + route.params.postId + '/comments',
        {
          method: 'get',
        },
        {
          immediate: true,
          onSuccess: res => {
            console.log(res);
            state.comments = res.data.data;
          },
          onError: err => {
            alert(err.response.data.data)
          }
        },
    );

    const initialState = {
      comments: [],
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
  mounted() {
    const store = usePostStore();
    if(!store.getPost) {
      this.postContent = localStorage.getItem('postContent')
    }
    else {
      const post = store.getPost;
      this.postContent = post.content;
      localStorage.setItem('postContent', post.content)
    }
  },
  data() {
    return {
      postContent: '',
      comment: '',
    }
  },
  methods: {
    submitComment() {
      if(!this.comment) {
        alert("Write comment first !");
        return;
      }
      const { submitExecute } = useAxios(
          'v1/posts/' + this.$route.params.postId + '/comments/form',
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
              location.reload();
            },
            onError: err => {
              alert(err.data.data);
            }
          },
      );
      const form = {commentContent: this.comment }
      submitExecute(form);
    }
  }
}
</script>

<style scoped>

</style>
