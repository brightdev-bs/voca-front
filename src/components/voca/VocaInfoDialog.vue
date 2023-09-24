<template>
  <v-dialog
      class="dialog"
      activator="parent"
      width="400px"
  >
    <v-card>
      <template v-slot:title>
        Wrong Words
      </template>
      <v-card-text>
        <ul class="word-list">
          <li v-for="(word, index) in wrongWords" :key="index">
            <span class="font-weight-bold mr-2">{{ word.word }}</span>
            <span class="ml-2 result">{{ word.definition }}</span>
          </li>
        </ul>
      </v-card-text>

      <v-card-actions>
        <v-btn
            elevation="4"
            @click="close()"
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
.word-list {
  list-style-type: none;
  padding: 0;
}
.word-list li {
  display: flex;
  justify-content: space-between;
  border: 2px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #888;
}

.dialog {
  background-color: #fff; /* 배경색 지정 */
  border: 1px solid #ccc; /* 테두리 추가 */
  padding: 20px; /* 여백 추가 */
  border-radius: 5px; /* 모서리를 둥글게 만듦 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.result {
  white-space: nowrap; /* 줄 바꿈 방지 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분을 ...으로 표시 */
}

</style>