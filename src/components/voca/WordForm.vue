<template>
  <h3 class="ma-3">Add new word</h3>
  <v-text-field
      v-model="form.word"
      :model-value="wordForm.word"
      @update:modelValue="updateWord"
      class="mt-3"
      label="word"
      variant="solo">
  </v-text-field>

  <v-text-field
      v-model="form.definition"
      :model-value="wordForm.definition"
      @update:modelValue="updateDefinition"
      label="definition"
      variant="solo">
  </v-text-field>

  <v-text-field
      v-model="form.note"
      :model-value="wordForm.note"
      @update:modelValue="updateNote"
      label="description"
      variant="solo">
  </v-text-field>

  <v-select
      v-model="select"
      :model-value="updateValue"
      @update:modelValue="updateCategory"
      :items="category"
      item-title="name"
      item-value="key"
      variant="solo"
      label="vocabulary"
  ></v-select>
  <v-btn
      v-text="buttonAction"
      class="float-right" @click="addWord"
  />

  <!-- 단어장 팝업 -->
  <v-dialog
      persistent
      width="480"
      v-model="vocaView"
      :model-value="isOpen"
  >
    <v-card>
      <v-card-title>
        <h3 class="ma-3">Add new word</h3>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
                v-model="voca.name"
                :model-value="vocaForm.name"
                @update:modelValue="updateVocaName"
                label="Name of vocabulary"
                variant="solo"
                required
            />
          </v-row>
          <v-row>
            <v-text-field
                v-model="voca.description"
                :model-value="vocaForm.description"
                @update:modelValue="updateVocaDescription"
                label="Description"
                variant="solo"
                required
            />
          </v-row>
          <v-row>
            <v-checkbox
                v-model="voca.isPublic"
                label="public"></v-checkbox>
          </v-row>
          If you check, other users can study with your vocabulary
        </v-container>
      </v-card-text>

      <!--  단어장 추가  -->
      <v-card-actions class="mb-3 mr-3">
        <v-spacer></v-spacer>
        <v-btn
            variant="text"
            elevation="4"
            @click="cancel"
        >
          cancel
        </v-btn>
        <v-btn
            variant="text"
            elevation="4"
            @click="addVocabulary"
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    category: Map,
    updateValue: String,
    isOpen: Boolean,
    vocaForm: Object,
    wordForm: Object,
    buttonAction: String,
  },
  data() {
    return {
      select: '',
      form: {
        word: '',
        definition: '',
        note: '',
      },
      vocaView: false,
      voca: {
        name: '',
        description: '',
        isPublic : true,
      },
    }
  },
  methods: {
    updateCategory() {
      if (this.select === String('add')) {
        this.$emit('openCategory');
      } else {
        this.$emit('updateCategory', this.select);
      }
    },
    addWord() {
      this.form = this.wordForm;
      this.$emit('addWord', this.form, this.buttonAction);
    },
    addVocabulary() {
      this.$emit('addVocabulary', this.voca);
    },
    cancel() {
      this.$emit('cancel')
    },
    updateVocaName() {
      this.$emit('updateVocaName', this.voca.name);
    },
    updateVocaDescription() {
      this.$emit('updateVocaDescription', this.voca.description);
    },
    updateWord() {
      this.$emit('updateWord', this.form.word);
    },
    updateDefinition() {
      this.$emit('updateDefinition', this.form.definition);
    },
    updateNote() {
      this.$emit('updateNote', this.form.note);
    }
  }

}
</script>
<style scoped>

</style>