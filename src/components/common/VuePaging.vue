<template>
  <div class="pagination mt-3" v-if="totalPage !== 0">
    <v-btn @click="moveToPrevPage" :disabled="currentPage === 1" class="pagination-button" size="small">&lt;</v-btn>
    <input
        class="ml-1 mr-1"
        @input="handlePageChange"
        v-model="inputModel"
        type="number"
        min="1"
        :max="totalPage"
    />
      / {{ totalPage }}
    <v-btn @click="nextPage" :disabled="currentPage === totalPage - 1" class="pagination-button" size="small">&gt;</v-btn>
  </div>
</template>
<script setup>
import {defineProps, defineEmits} from 'vue';
import _debounce from 'lodash/debounce';
import {ref, watch} from "vue";

const emit = defineEmits(['prev-page', 'next-page', 'pageChanged'])
const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

let inputModel = ref(props.currentPage)

watch(() => props.currentPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    inputModel = ref(newValue)
  }
});



const moveToPrevPage = () =>  {
  emit('prev-page', inputModel);
}

const nextPage = () => {
  emit('next-page', inputModel);
}

const handlePageChange = _debounce(function () {
  changePage();
}, 500)

const changePage = () => {
  emit('update:handle-page-change', inputModel)
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

.input-container {
  display: flex;
  align-items: center;
  margin: 20px;
  font-family: Arial, sans-serif;
}

label {
  margin-right: 10px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50px;
}

span {
  margin-left: 10px;
  color: #888;
}

</style>