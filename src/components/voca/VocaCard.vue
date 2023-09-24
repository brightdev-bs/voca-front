<template>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <div v-if="!isDefinition">
        <v-card class="d-flex text-center align-center" style="height: 300px;">
          <v-card-text>
            <div>
              <h2>{{ current.word }}</h2>
              <p class="mt-2">{{ current.note }}</p>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    current: {
      word: '',
      definition: '',
      note: '',
    },
  },
  data() {
    return {
      isDefinition: false,
    }
  }

}
</script>
<style scoped>

</style>