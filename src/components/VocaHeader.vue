<template>
  <v-app-bar :elevation="10">
    <v-btn href="/">voca</v-btn>
    <template v-slot:append>
      <v-btn-group v-if="isActive()">
        <v-btn href="/login">LOGIN</v-btn>
        <v-btn href="/sign-up">SIGN-UP</v-btn>
      </v-btn-group>
      <v-btn-group v-else>
        <v-btn>{{ username }}</v-btn>
      </v-btn-group>
    </template>
  </v-app-bar>
</template>

<script>
export default {

  data() {
    return {
      username: '',
    }
  },

  methods: {
    isActive() {
      this.username = localStorage.getItem("id")
      if(this.username) {
        return false;
      } else {
        return true;
      }
    }
  }

}
</script>

<style scoped>

</style>