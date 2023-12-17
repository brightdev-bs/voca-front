<template>
  <div>
    <h3 class="ma-3"> {{ title }}</h3>
    <v-card
        class="mx-auto"
    >
      <v-list
          v-model="selectedVoca"
          :items="this.vocabulary"
          item-title="name"
          item-value="id"
          @click:select="openVocabulary"
      ></v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    vocabulary: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      selectedVoca: null,
    }
  },
  methods: {
    openVocabulary(selected) {
      this.$emit('openVocabulary', selected)

    }
  }
}
</script>
<style scoped>

</style>