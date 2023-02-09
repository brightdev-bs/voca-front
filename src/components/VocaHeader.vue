<template>
  <v-app-bar :elevation="10">
    <v-btn href="/">voca</v-btn>
    <template v-slot:append>
      <v-btn-group>
        <v-btn href="/login">LOGIN</v-btn>
        <v-btn href="/sign-up">SIGN-UP</v-btn>
      </v-btn-group>
    </template>
  </v-app-bar>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>