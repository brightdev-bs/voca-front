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
        @contextmenu.prevent="showContextMenu(word.id, $event)"
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
              @click="editWord(index)"
          />
        </v-col>
      </td>
    </tr>
    </tbody>
  </v-table>

  <div v-if="contextMenu.show" class="context-menu" :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }">
    <ul>
      <li @click="editWord(contextMenu.index)">Edit</li>
      <li @click="deleteWord(contextMenu.index)">Delete</li>
    </ul>
  </div>

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