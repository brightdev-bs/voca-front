<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left words" width="45%">
        Word
      </th>
      <th class="text-left" width="45%">
        Definition
      </th>
      <th class="text-left" width="10%">
        check
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(word, index) in words"
        :key="word.id"
    >
      <td>{{ word.word }}</td>
      <td :class="{ hide: word.isHidden }" @click="changeHideStatus(index)">{{ word.definition }}</td>
      <td>
        <v-checkbox v-model="word.checked" @click="check(word.id)"></v-checkbox>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  props: {
    words: Array,
    isHidingDefinition: Boolean,
  },
  data () {
    return {

    }
  },
  methods: {
    check(id) {

      console.log(id);
      axios
          .patch(this.server + '/v1/words/' + id, {
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            }
          })
          .then(res => {
            console.log(res.data.statusCode)
          })
          .catch(err => {
            console.log(err);
          })
    },
    changeHideStatus(id) {
      this.$emit('changeHideStatus', id);
    }
  }
}
</script>

<style scoped>
.hide {
  color: white;
  background-color: white;
}
</style>