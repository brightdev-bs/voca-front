<template>
  <v-card
      class="mx-auto"
      width="350"
  >

    <v-card-text>
      <h3 class="me-2">name : {{ info.name }}</h3>
      <p> {{ info.introduction }} </p>
    </v-card-text>

    <v-card-actions class="float-end me-2">
      <v-btn size="small" variant="tonal" @click="reject(info.id)">
        reject
      </v-btn>
      <v-btn size="small" variant="tonal" @click="accept(info.id)">
        accept
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>

export default {
  props: {
    info: {},
  },
  methods: {
    reject(id) {
      this.$emit('rejectUser', id);
    },
    accept(id) {
      this.$emit('acceptUser', id);
    }
  }
}
</script>

<style scoped>

</style>