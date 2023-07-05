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
import VocaHeader from "@/components/VocaHeader";
import VocaFooter from "@/components/VocaFooter.vue";
export default {
  name: 'App',
  components: {
    VocaHeader,
    VocaFooter,
  },
}
</script>
