<template>
  <v-bottom-navigation grow v-model="value">
    <v-btn value="today" @click="getWords('today')">Today</v-btn>

    <v-btn value="yesterday" @click="getWords('yesterday')">Yesterday</v-btn>

    <v-btn value="aWeek" @click="getWords('week')">1 Week ago</v-btn>

    <v-btn value="aMonth" @click="getWords('month')">1 Month ago</v-btn>
  </v-bottom-navigation>
</template>

<script>

export default {
  data() {
    return {
      value: 'today',
    }
  },
  methods: {
    getWords(day) {
      this.$emit('update', day);
    }
  }
}
</script>

<style scoped>

</style>