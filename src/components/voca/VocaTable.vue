<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left" width="5%"/>
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
      <td class="pa-0 ma-0"><v-icon icon="mdi-volume-high" @click="speakText(word)"/></td>
      <td @touchstart.prevent="handleLongPress(word.id, index, $event)">{{ word.word }}</td>
      <td :class="{ hide: word.isHidden }" @click="changeHideStatus(index)">{{ word.definition }}</td>
    </tr>
    </tbody>
    <div v-if="contextMenu.show" class="context-menu" :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }">
      <ul>
        <li @click="editWord(contextMenu.id, contextMenu.index)">Edit</li>
        <li @click="deleteWord(contextMenu.id, contextMenu.index)">Delete</li>
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
        id: 0,
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
    editWord(id, index) {
      this.$router.push({name:'AddWord', params: { word: JSON.stringify(this.words[index])}});
    },
    deleteWord(id, index) {
      const { dateExecute } = useAxios(
          '/v1/words/' + id,
          {
            method: 'delete',
            headers: {
              "Content-Type": 'application/json',
              Authorization: localStorage.getItem("token"),
            },
          },
          {
            immediate: false,
            onSuccess: () => {
              this.$emit('removeElement', index);
            },
            onError: err => {
              alert(err.data.data);
            }
          },
      );
      dateExecute();
    },
    showContextMenu(id, index, event) {
      event.preventDefault();
      this.contextMenu.show = true;
      this.contextMenu.index = index;
      this.contextMenu.id = id;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;

      document.addEventListener('click', this.closeContextMenu);
    },
    closeContextMenu() {
      this.contextMenu.show = false;
      document.removeEventListener('click', this.closeContextMenu);
    },
    handleLongPress(id, index, event) {
      event.preventDefault();

      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;

      event.clientX = x;
      event.clientY = y;

      this.showContextMenu(id, index, event);
    },
    speakText(text) {
      const speechSynthesis = window.speechSynthesis;
      const wordSpeech = new SpeechSynthesisUtterance(text.word);
      wordSpeech.rate = 0.8;
      speechSynthesis.speak(wordSpeech);
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

.v-icon {
  width: 24px;
  height: 24px;
}
</style>