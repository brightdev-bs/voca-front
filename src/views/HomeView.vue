<template>
  <section>
    <PublicVocaList
        :vocabularies="this.vocabularies"
    />
  </section>
</template>

<script>

import PublicVocaList from "@/components/home/PublicVocaList.vue";
import {useAxios} from "@/composables/useAxios";
import {useHead} from "@vueuse/head";

useHead({
  meta: [
    {
      name: `description`,
      content: 'The best frequent vocabulary for TOPIK Test and Essential English Vocabulary for Korean SAT'
    }
  ]
})
export default {
  components: {PublicVocaList},
  data() {
    return {
      vocabularies: [],
    }
  },
  mounted() {
    useAxios(
        'v1/home',
        {
          method: 'get',
        },
        {
          immediate: true,
          onSuccess: (res) => {
            this.vocabularies = res.data.data;
          },
          onError: err => {
            alert(err);
          }
        },
    );
  },
}
</script>

<style scoped>

</style>