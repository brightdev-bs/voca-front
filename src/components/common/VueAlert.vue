<template>
  <div v-if="showAlert" class="alert">
    <v-alert
        v-if="!isCorrect"
        type="error"
        title="Wrong"
    />
    <v-alert
        v-else
        type="success"
        title="Correct"
    />
  </div>
</template>
<script>
export default {
  props: {
    showAlert: Boolean,
    isCorrect: Boolean,
  },
}
</script>
<style scoped>

</style>