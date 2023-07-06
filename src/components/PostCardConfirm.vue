<template>
  <v-card
      class="mx-auto"
      width="350"
  >

    <v-card-text>
      <h3 class="me-2">{{ name }}</h3>
      <p> {{ introduction }} </p>
    </v-card-text>

    <v-card-actions class="float-end me-2">
      <v-btn size="small" variant="tonal">
        reject
      </v-btn>
      <v-btn size="small" variant="tonal">
        accept
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>

export default {
  props: {
    name: String,
    introduction: String,
  }
}
</script>

<style scoped>

</style>