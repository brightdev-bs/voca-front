<template>
  <v-app>
    <v-main>
      <v-container>
        <voca-header></voca-header>
        <VocaView></VocaView>
        <voca-footer></voca-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VocaHeader from "@/layout/VocaHeader.vue";
import VocaFooter from "@/layout/VocaFooter.vue";
import VocaView from "@/layout/VocaView.vue";
export default {
  name: 'App',
  components: {
    VocaHeader,
    VocaView,
    VocaFooter,
  },
}
</script>

