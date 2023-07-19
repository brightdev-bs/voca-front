import { defineStore } from 'pinia';

export const usePostStore = defineStore("PostStore", {
    state: () => {

        return {
            post: '',
        }
    },

    getters: {
        getContent() {
            return this.post.content;
        },
        getPost() {
            return this.post;
        }
    },

    actions: {
        setPost(post) {
            this.post = post;
        }
    }
})