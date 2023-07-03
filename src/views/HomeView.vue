<template>

  <section>
    <h3 class="mb-3">Search Community</h3>
     <v-text-field
         :append-icon="'mdi-comment-search-outline'"
         label="Language Exchange Community"
         variant="solo"
         size="x-large"
     />
  </section>

  <!-- 검색 결과  -->
  <section>
    <div class="d-flex">
      <h3 class="mb-3">Language Community</h3>
      <v-btn class="me-5 ml-auto" href="/community/form">create</v-btn>
    </div>
    <v-row
        class="float-sm-left mt-1 mb-1 mr-0"
        v-for="community in state.communities"
        :key="community.id"
    >
      <v-col>
        <v-card
            class="mx-auto"
            width="350"
            prepend-icon="mdi-account-group-outline"
        >
          <template v-slot:title>
            {{ community.name }}
          </template>

          <v-card-item>
            <div>
              <div class="text-caption"> {{ community.description }} </div>
            </div>
          </v-card-item>
          <v-divider></v-divider>
          <v-card-actions class="float-end me-2">
            <p class="me-4">
              <v-icon icon="mdi-account-multiple"></v-icon>
              {{ community.totalNumber }}
            </p>
            <v-btn size="small" variant="tonal" @click="toCommunity(community.id)">
              Look Into
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </section>

</template>

<script>

import {useAxios} from "@/composables/useAxios";
import {reactive} from "vue";

export default {
  setup () {
    const { loading, dateExecute } = useAxios(
        'v1/community',
        {
          method: 'get',
          headers: {
            "Content-Type": 'application/json',
            Authorization: localStorage.getItem("token"),
          },
        },
        {
          immediate: true,
          onSuccess: res => {
            console.log(res)
            console.log(res.data.data)
            state.communities = res.data.data;
          },
          onError: err => {
            alert(err);
          }
        },
    );

    const initialState = {
      form: {
        name: '',
        description: '',
        total: 5,
        isPublic: true,
      },
      communities: [],
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    return { state }
  },
  methods: {
    toCommunity(id) {
      location.href = "/community/" + id;
    }
  }
}
</script>

<style scoped>

</style>