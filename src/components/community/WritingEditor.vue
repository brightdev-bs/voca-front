<template>
  <div id="app">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {

  name: 'app',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
            '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
            '|', 'blockQuote', 'codeBlock', //, 'uploadImage'
            '|', 'bulletedList', 'numberedList', 'todoList',
          ]
        },
        placeholder: 'Content of the post',
      }
    };
  },


};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>