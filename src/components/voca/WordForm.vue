<template>
  <h3 class="ma-3">Add new word</h3>
  <v-text-field
      v-model="form.word"
      class="mt-3"
      label="word"
      variant="solo">
  </v-text-field>

  <v-text-field
      v-model="form.definition"
      label="definition"
      variant="solo">
  </v-text-field>

  <v-text-field
      v-model="form.note"
      label="description"
      variant="solo">
  </v-text-field>

  <v-select
      v-model="select"
      :model-value="updateValue"
      :items="category"
      item-title="name"
      item-value="key"
      variant="solo"
      label="vocabulary"
      @update:modelValue="updateCategory"
  ></v-select>
  <v-btn class="float-right" @click="addWord">add</v-btn>
</template>
<script>
export default {
  props: {
    category: Map,
    updateValue: String,
  },
  data() {
    return {
      select: '',
      form: {
        word: '',
        definition: '',
        note: '',
      },
    }
  },
  methods: {
    updateCategory() {
      if (this.select === String('add')) {
        this.$emit('openCategory');
      } else {
        console.log(this.select);
        this.$emit('updateCategory', this.select);
      }
    },
    addWord() {
      this.$emit('addWord', this.form);
    }
  }

}
</script>
<style scoped>

</style>