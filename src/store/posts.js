import { defineStore } from 'pinia';
import PostsService from '@/services/posts.service';

export const postsActions = {
  GET_POSTS: 'GET_POSTS',
  GET_POST_BY_ID: 'GET_POST_BY_ID',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  REMOVE_POST: 'REMOVE_POST'
}

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    loading: false,
    error: null // TODO: Add correct error handling (mb show toast messages)
  }),

  actions: {
    [postsActions.GET_POSTS]: async function(params) {
      this.loading = true;
      try {
        this.posts = await PostsService.getPosts(params);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    [postsActions.GET_POST_BY_ID]: async function(id) {
      try {
        this.post = await PostsService.getPostById(id);
      } catch (error) {
        this.error = error;
      }
    },

    [postsActions.CREATE_POST]: async function(data) {
      try {
        const createdPost = await PostsService.createPost(data);
        this.posts.unshift(createdPost);
      } catch (error) {
        this.error = error
      }
    },

    [postsActions.UPDATE_POST]: async function({ id, ...data }) {
      try {
        const updatedPost = await PostsService.updatePost(id, data);
        const postIndex = this.posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1, { ...updatedPost, ...data });
        }
      } catch (error) {
        this.error = error;
      }
    },

    [postsActions.REMOVE_POST]: async function({ id }) {
      try {
        await PostsService.removePost(id);
        const postIndex = this.posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1);
        }
      } catch (error) {
        this.error = error;
      }
    }
  },
});
