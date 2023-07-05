<template>
  <v-card
      prepend-icon="mdi-home"
  >
    <template v-slot:title>
      {{ title }}
    </template>

    <v-card-text>
      {{ createdAt }}
    </v-card-text>

  </v-card>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>