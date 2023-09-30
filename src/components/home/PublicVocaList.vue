<template>
  <v-card
      @click="moveToVoca(vocabulary.id)"
      class="mb-3 d-flex flex-column align-center card-small"
      elevation="5"
      v-for="vocabulary in vocabularies"
      :key="vocabulary.id"
  >
    <v-card-text>
      <!-- 제목 -->
      <div class="text-h6 mb-2 font-weight-bold text-center"> {{ vocabulary.name }} </div>
      <p class="mb-2 mt-2 text-primary text-center">{{ vocabulary.description }}</p>

      <!-- 구분선 -->
      <v-divider class="mb-2 text-center" style="max-width: 270px;"/>

      <p class="text-center"> {{ vocabulary.liked }} people are studying this vocabulary </p>

    </v-card-text>

  </v-card>
</template>
<script>


export default {
  props: {
    vocabularies: Array,
  },
  methods: {
    moveToVoca(id) {
      window.location.href = '/vocabulary?voca=' + id + '&page=1'
    }
  }
}
</script>
<style scoped>

</style>