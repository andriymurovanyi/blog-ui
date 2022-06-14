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
    loading: false, // TODO: Process loading
    error: null // TODO: Add error handling
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
      this.loading = true
      try {
        const createdPost = await PostsService.createPost(data);
        this.posts.unshift(createdPost);
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false;
      }
    },

    [postsActions.UPDATE_POST]: async function({ id, ...data }) {
      this.loading = true
      try {
        const updatedPost = await PostsService.updatePost(id, data);
        const postIndex = this.posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1, { ...updatedPost, ...data });
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    [postsActions.REMOVE_POST]: async function({ id }) {
      this.loading = true
      try {
        await PostsService.removePost(id);
        const postIndex = this.posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1);
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
});
