<template>
  <v-app>
    <v-main>
      <voca-header></voca-header>
<!--      <voca-list></voca-list>-->
      <voca-table></voca-table>
      <voca-footer></voca-footer>
    </v-main>
  </v-app>
</template>

<script>
import VocaHeader from "@/components/VocaHeader";
import VocaFooter from "@/components/VocaFooter";
import VocaTable from "@/components/VocaTable";
// import VocaList from "@/components/VocaList";

export default {
  name: 'App',

  components: {
    VocaHeader,
    // VocaList,
    VocaFooter,
    VocaTable,
  },

  data: () => ({
    //
  }),
}
</script>
