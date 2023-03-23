<template>
  <v-app>
    <v-main>
      <v-container>
        <voca-header></voca-header>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VocaHeader from "@/components/VocaHeader";
export default {
  name: 'App',
  components: {
    VocaHeader,
  },
}
</script>
