<template>
  <div v-if="showAlert" class="alert">
    <v-alert
        v-if="!isCorrect"
        type="error"
        :title=errorTitle
    />
    <v-alert
        v-else
        type="success"
        :title=successTitle
    />
  </div>
</template>
<script>
export default {
  props: {
    showAlert: Boolean,
    isCorrect: Boolean,
    errorTitle: String,
    successTitle: String,
  },
}
</script>
<style scoped>

</style>