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
      value: this.getTitle()
    }
  },
  methods: {
    getWords(day) {
      location.href = this.domain + "/?date=" + day;
    },
    getTitle() {
      let date = this.$route.query.date;
      if(!date || date == 'today') return 'today';
      else if(date == 'yesterday') return 'yesterday';
      else if(date == 'week') return 'aWeek';
      else if(date == 'month') return 'aMonth';
    }
  }
}
</script>

<style scoped>

</style>