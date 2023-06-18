<template>
  <v-alert type="error" v-if="this.flag">
    {{ this.message }}
  </v-alert>
</template>

<script>

export default {
  props: {
    flag: Boolean,
    message: String,
  }

}
</script>

<style scoped>

</style>