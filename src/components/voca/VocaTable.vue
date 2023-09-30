<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left words" width="45%">
        Word
      </th>
      <th class="text-left" width="55%">
        Definition
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(word, index) in words"
        :key="word.id"
    >
      <td @touchstart.prevent="handleLongPress(index, $event)">{{ word.word }}</td>
      <td :class="{ hide: word.isHidden }" @click="changeHideStatus(index)">{{ word.definition }}</td>
    </tr>
    </tbody>
    <div v-if="contextMenu.show" class="context-menu" :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }">
      <ul>
        <li @click="editWord(contextMenu.index)">Edit</li>
        <li @click="deleteWord(contextMenu.index)">Delete</li>
      </ul>
    </div>
  </v-table>

</template>

<script>
import axios from "axios";
import {useAxios} from "@/composables/useAxios";

export default {
  props: {
    words: Array,
    isHidingDefinition: Boolean,
  },
  data() {
    return {
      contextMenu: {
        show: false,
        index: null,
        x: 0,
        y: 0,
      },
    }
  },
  methods: {
    check(id) {
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
    editWord(index) {
      this.$router.push({name:'AddWord', params: { word: JSON.stringify(this.words[index])}});
    },
    deleteWord(index) {
      console.log(index);
      const { dateExecute } = useAxios(
            '/v1/words/' + index,
          {
            method: 'delete',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: false,
            onSuccess: res => {
              console.log(res);
            },
            onError: err => {
              alert(err.data.data);
            }
          },
      );
      dateExecute();
    },
    showContextMenu(index, event) {
      event.preventDefault();
      this.contextMenu.show = true;
      this.contextMenu.index = index;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;

      document.addEventListener('click', this.closeContextMenu);
    },
    closeContextMenu() {
      this.contextMenu.show = false;
      document.removeEventListener('click', this.closeContextMenu);
    },
    handleLongPress(index, event) {
      event.preventDefault();

      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;

      event.clientX = x;
      event.clientY = y;

      this.showContextMenu(index, event);
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
.context-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.context-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.context-menu ul li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu ul li:hover {
  background-color: #f0f0f0;
}
</style>