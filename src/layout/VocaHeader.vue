<template>
  <v-app-bar :elevation="10">
    <v-btn href="/">voca</v-btn>
    <template v-slot:append>
      <v-btn-group v-if="isActive()">
        <v-btn href="/login">LOGIN</v-btn>
      </v-btn-group>
      <v-btn-group v-else>
        <v-btn href="/my-page">{{ username }}</v-btn>
        <v-btn @click="logout">logout</v-btn>
      </v-btn-group>
    </template>
  </v-app-bar>
</template>

<script>
import router from "@/router/router";

export default {

  data() {
    return {
      username: '',
    }
  },

  methods: {
    isActive() {
      this.username = localStorage.getItem("name");
      this.token = localStorage.getItem("token");
      if(this.username) {
        return false;
      } else {
        return true;
      }
    },
    logout() {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      router.go();
    }
  }

}
</script>

<style scoped>

</style>