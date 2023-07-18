<template>
  <div id="app">
    <ckeditor :editor="editor" v-model="$props.editorData" :config="editorConfig" @click="tmp" :disabled="editorDisabled"></ckeditor>
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
      editorDisabled: true,
      editorConfig: {
        toolbar: {
          items: [],
        },
      },
    };
  },
};
</script>