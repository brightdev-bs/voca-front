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
export default {
  name: 'App',
  setup() {
    const siteData = reactive({
      title: `Voca-World`,
      description: 'Voca-World is a web service for learning words. It offers a variety of features to enhance language learning effectively.'
    })
    useHead({
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        }
      ]
    })
  },
  components: {
    VocaHeader,
    VocaView,
    VocaFooter,
  },
}
</script>

