import { defineStore } from 'pinia';

export const useWordGameStore = defineStore("WordGame", {
    state: () => {

        return {
            words: [],
        }
    },

    getters: {
        getSize() {
            return this.words.length;
        },
        getWords() {
            return this.words;
        }
    },

    actions: {
        setWords(words) {
            this.words = words;
        }
    }
})