<template>
  <v-app>
    <v-main>
      <v-container>
        <voca-header></voca-header>
        <router-view></router-view>
        <voca-footer></voca-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VocaHeader from "@/layout/VocaHeader.vue";
import VocaFooter from "@/layout/VocaFooter.vue";
export default {
  name: 'App',
  components: {
    VocaHeader,
    VocaFooter,
  },
}
</script>
