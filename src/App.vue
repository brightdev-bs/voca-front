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
import {computed, reactive} from "vue";
import {useHead} from "@vueuse/head";
useHead({
  title: `Voca-World`,
  meta: [
    {
      name: `description`,
      description: 'Voca-World is a web service for learning words. It offers a variety of features to enhance language learning effectively.'
    }
  ]
})
export default {
  name: 'App',
  components: {
    VocaHeader,
    VocaView,
    VocaFooter,
  },
}
</script>

