<template>
  <div id="app">
    <ckeditor :editor="editor" v-model="$props.editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  props: {
    editorData: String,
  },
  name: 'app',
  data() {
    return {
      editor: ClassicEditor,
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
};
</script>