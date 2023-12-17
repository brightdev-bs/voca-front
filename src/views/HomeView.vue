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
  <v-btn block @click="more" v-if="isMore">More</v-btn>
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
      page: 0,
      isMore: true,
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
    more() {
      this.page++;
      useAxios(
          'v1/home?page=' + this.page,
          {
            method: 'get',
          },
          {
            immediate: true,
            onSuccess: (res) => {
              const words = res.data.data;
              this.vocabularies = this.vocabularies.concat(words);
              if (words.length < 5) {
                this.isMore = false;
              }
            },
            onError: err => {
              alert(err);
            }
          },
      )
    }
  }
}
</script>

<style scoped>

</style>