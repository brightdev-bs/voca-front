<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left words" width="52%">
        Word
      </th>
      <th class="text-left" width="55%">
        Definition
      </th>
      <td class="text-center pa-1" width="3%">
        edit
      </td>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(word, index) in words"
        :key="word.id"
    >
      <td>{{ word.word }}</td>
      <td :class="{ hide: word.isHidden }" @click="changeHideStatus(index)">{{ word.definition }}</td>
      <td class="pa-1">
        <v-col cols="auto pa-0">
          <v-btn
              density="compact"
              icon="mdi-file-edit-outline"
              @click="editWord(word.id)"
          />
        </v-col>
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
    },
    editWord(id) {
      console.log(id);
    }
  }
}
</script>

<style scoped>
.hide {
  color: white;
  background-color: white;
}
.v-col v-col-auto {
  padding: 0;
}
</style>