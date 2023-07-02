<template>
  <v-bottom-navigation grow v-model="value">
    <v-btn value="home" href="/">Home</v-btn>
    <v-btn value="today" href="/vocabulary">Vocabulary</v-btn>
    <v-btn value="my-page" href="/my-page">MyPage</v-btn>
  </v-bottom-navigation>
</template>

<script>

export default {
  data() {
    return {
      value: this.getTitle()
    }
  },
  methods: {
    getTitle() {
      let date = this.$route.query.date;
      if(!date) return 'today';
    }
  }
}
</script>

<style scoped>

</style>