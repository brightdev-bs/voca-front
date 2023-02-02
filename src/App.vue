<template>
  <v-app>
    <v-main>
      <voca-header></voca-header>
      <router-view></router-view>
      <voca-footer></voca-footer>
    </v-main>
  </v-app>
</template>

<script>
import VocaHeader from "@/components/VocaHeader";
import VocaFooter from "@/components/VocaFooter";
export default {
  name: 'App',
  components: {
    VocaHeader,
    VocaFooter
  }

}
</script>
