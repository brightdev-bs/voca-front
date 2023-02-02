<template>
  <div class="ma-5">
    {{ this.date + '\'s voca' }}
    <v-btn href="/words/new" class="float-right mx-auto">추가하기</v-btn>
  </div>
  <voca-table :words="this.words"></voca-table>
</template>

<script>
import VocaTable from "@/components/VocaTable";

export default {
  components: {
    VocaTable,
  },
  data() {
    return {
      date: "today",
      words: [
        {
          id: 1,
          english: 'Frozen Yogurt',
          korean: "요거트",
          check: false
        },
        {
          id: 2,
          english: 'Frozen Yogurt',
          korean: "요거트",
          check: false
        },
        {
          id: 3,
          english: 'Frozen Yogurt',
          korean: "요거트",
          check: false
        },
        {
          id: 4,
          english: 'Frozen Yogurt',
          korean: "요거트",
          check: false
        },

      ],
    }
  },
  methods: {
    addWord() {

    }
  }
}
</script>

<style scoped>

</style>