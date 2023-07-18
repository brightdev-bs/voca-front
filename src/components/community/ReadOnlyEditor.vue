<template>
  <div id="app">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :disabled="editorDisabled"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {

  name: 'app',
  data() {
    return {
      editor: ClassicEditor,
      editorDisabled: true,
      editorData: '',
      editorConfig: {
        toolbar: {
          items: [],
        },
      },
    };
  },

};
</script>