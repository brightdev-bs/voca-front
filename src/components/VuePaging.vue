<template>
  <div class="pagination mt-3">
    <v-btn @click="prevPage" :disabled="currentPage === String(1)" class="pagination-button" size="small">&lt;</v-btn>
    <span class="page-count">{{ currentPage }} / {{ totalPage }}</span>
    <v-btn @click="nextPage" :disabled="currentPage === String(totalPage)" class="pagination-button" size="small">&gt;</v-btn>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: Number, // 현재 페이지 번호
    totalPage: Number,  // 전체 페이지 개수
  },
  methods: {
    prevPage() {
      this.$emit('prev-page', Number(this.$route.query.page) - 1);
    },
    nextPage() {
      this.$emit('next-page', Number(this.$route.query.page) + 1);
    },
  },
}
</script>
<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-list li {
  margin: 0 5px;
}

.page-count {
  padding: 0 1rem;
}


</style>