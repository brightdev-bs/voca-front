<template>
  <div id="app">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
  <div class="d-flex ma-3">
    <v-btn class="ml-auto" @click="submit()">
      submit
    </v-btn>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useAxios} from "@/composables/useAxios";
import {Response} from "@/global/constants";

export default {
  name: 'app',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorDisabled: true,
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|', 'bold', 'italic',
            '|', 'blockQuote',
            '|', 'bulletedList', 'numberedList',
          ]
        },
        placeholder: 'Content of the post',
      }
    };
  },
  methods: {
    submit() {
      const { dateExecute } = useAxios(
          'v1/community/' + this.$route.params.communityId + '/posts/form',
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
              location.href = this.domain;
            },
            onError: err => {
              alert(err.response.data.data);
            }
          },
      );

      const form = {
        postContent: this.editorData,
      }

      dateExecute(form);
    }
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>