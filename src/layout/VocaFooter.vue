<template>
  <v-bottom-navigation grow v-model="value" active>
    <v-btn href="/" v-bind:active="isHome">Home</v-btn>
    <v-btn href="/vocabulary?page=1" v-bind:active="isVoca">Vocabulary</v-btn>
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
    console.log(window.location.pathname);
    if(window.location.pathname.startsWith("/vocabulary")){
      this.selectFooter(true, false, false)
    } else if(window.location.pathname.startsWith("/my-page")) {
      this.selectFooter(false, false, true)
    } else if(window.location.pathname === '/'){
      this.selectFooter(false, true, false)
    }
  },
  methods: {
    selectFooter(voca, home, mypage) {
      this.isVoca = voca;
      this.isHome = home;
      this.isMyPage = mypage
    }
  }
}
</script>

<style scoped>

</style>


