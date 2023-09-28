<template>
  <v-dialog
      persistent
      width="480"
      v-model="open"
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
                label="Name of vocabulary"
                variant="solo"
                required
            />
          </v-row>
          <v-row>
            <v-text-field
                v-model="voca.description"
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
  data() {
    return {
      open: true,
      voca: {
        name: '',
        description: '',
        isPublic : true,
      },
    }
  },
  methods: {
    addVocabulary() {
      this.$emit('addVocabulary', this.voca);
    },
    cancel() {
      this.$emit('closePopup');
    }
  }
}
</script>
<style scoped>

</style>