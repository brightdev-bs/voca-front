<template>
  <v-bottom-navigation grow v-model="value" active>
    <v-btn href="/" v-bind:active="isHome">Home</v-btn>
    <v-btn href="/vocabulary" v-bind:active="isVoca">Vocabulary</v-btn>
    <v-btn href="/my-page" v-bind:active="isMyPage">MyPage</v-btn>
  </v-bottom-navigation>
</template>

<script>

export default {
  data() {
    return {
      value: 0,
      isVoca: false,
      isHome: false,
      isMyPage: false,
    }
  },
  mounted() {
    if(window.location.pathname.startsWith("/vocabulary")){
      console.log("voca")
      this.isVoca = true;
      this.isHome = false;
      this.isMyPage = false
    } else if(window.location.pathname.startsWith("/my-page")) {
      console.log("mypage")
      this.isVoca = false;
      this.isHome = false;
      this.isMyPage = true
    } else {
      console.log("home")
      this.isVoca = false;
      this.isHome = true;
      this.isMyPage = false;
    }
  },
}
</script>

<style scoped>

</style>


