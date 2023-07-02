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
    <h3 class="mb-3">Language Community</h3>
    <v-row class="float-sm-left">
      <v-col>
        <v-card
            class="mx-auto"
            width="350"
            prepend-icon="mdi-home"
        >
          <template v-slot:title>
            This is a title
          </template>

          <v-card-item>
            <div>
              <div class="text-caption">Greyhound divisely hello coldly fonwderfully. </div>
            </div>
          </v-card-item>
          <v-divider></v-divider>
          <v-card-actions class="float-end me-2">
            <p class="me-4">
              <v-icon icon="mdi-account-multiple"></v-icon>
              21 / 50
            </p>
            <v-btn size="small" variant="tonal" @click="toCommunity()">
              Look Into
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </section>

</template>

<script>

export default {
  methods: {
    toCommunity(id) {
      console.log("community id = ", id);
    }
  }
}
</script>

<style scoped>

</style>