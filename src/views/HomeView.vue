<template>
  <search-bar
    class="mb-2"
    @submit="searchProduct"
  />
  <section>
    <PublicVocaList
        :vocabularies="this.vocabularies"
    />
  </section>
</template>

<script>

import PublicVocaList from "@/components/home/PublicVocaList.vue";
import {useAxios} from "@/composables/useAxios";
import SearchBar from "@/components/home/SearchBar.vue";
export default {
  components: {SearchBar, PublicVocaList},
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
    )
  },
  methods: {
    searchProduct(keyword) {
      useAxios(
          'v1/voca/search?keyword=' + keyword,
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
      )
    },
  }
}
</script>

<style scoped>

</style>