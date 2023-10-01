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
  head() {
    return {
      title: "Voca-World",
      meta: [
        { name: 'description', content: 'Voca-World Is A Best Language Partner. It Helps You To Easily memorize Vocabulary. We Also Provide Essential TOPIK Vocabulary.' },
        { name: 'keywords', content: 'vocabulary, language partner' },
      ],
    }
  }

}
</script>

<style scoped>

</style>