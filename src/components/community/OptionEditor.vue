<template>
  <div id="app">
    <ckeditor :editor="editor" v-model="$props.editorData" :config="editorConfig" :disabled="editorDisabled"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: {
    editorData: String,
    editorDisabled: Boolean,
  },
  name: 'app',
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [],
        },
      },
    };
  },
};
</script>