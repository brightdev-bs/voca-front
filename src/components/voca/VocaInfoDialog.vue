<template>
  <v-dialog
      activator="parent"
      width="400px"
  >
    <v-card>
      <template v-slot:title>
        {{ title }}
      </template>
      <v-card-text>
        score : {{ score }} <br>
        wrong : {{ wrongWords }} <br>
      </v-card-text>

      <v-card-actions>
        <v-btn
            variant="tonal"
            @click="moveToMain"
        >
          To Main Pagewhy
        </v-btn>
        <v-btn
            variant="tonal"
            @click="close"
        >
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    title: String,
    score: String,
    wrongWords: Array,
  },
  methods: {
    close() {
      this.$emit('close');
    },
    moveToMain() {
      this.$emit("main");
    }

  }

}
</script>

<style scoped>

</style>