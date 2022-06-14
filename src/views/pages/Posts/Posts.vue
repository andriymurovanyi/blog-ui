<template>
  <div class="posts-list">
    <v-modal v-model="isRemoveModalOpened">
      <template #header>
        Item removal
      </template>
      <template #body>
        You really want to remove item ?
      </template>
      <template #footer>
        <div class="modal-actions">
          <v-button type="primary" @click="closeRemoveModal">Cancel</v-button>
          <v-button type="error" @click="removePostFn">Confirm</v-button>
        </div>
      </template>
    </v-modal>
    <v-modal v-model="isEditModalOpened">
      <template #header>
        Item editing
      </template>
      <template #body>
        <div class="d-flex">
          <v-text-field v-model="activePost.title" label="Post title" />
          <v-text-field v-model="activePost.body" label="Post body" />
        </div>
      </template>
      <template #footer>
        <div class="modal-actions">
          <v-button type="warning" @click="closeEditModal">Cancel</v-button>
          <v-button @click="updatePostFn" :disabled="!canSavePost" type="success">Confirm</v-button>
        </div>
      </template>
    </v-modal>
    <v-post
      v-for="(post, index) in paginatedPosts"
      :key="index"
      :details="post"
      @edit="openEditModal"
      @remove="openRemoveModal"
    />
    <div class="rounded-xl border shadow-md w-9/12 m-auto bg-white">
      <button
        class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        :disabled="page <= 1"
        @click="page = page - 1"
      >
        Prev
      </button>
      <button
        class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        @click="page = page + 1"
        :disabled="!hasNextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { usePostsStore, postsActions } from '@/store';
import vPost from '@/components/Post/Post.vue';
import vModal from '@/components/common/Modal/Modal.vue';
import vButton from '@/components/common/Button/Button.vue';
import vTextField from '@/components/common/TextField/TextField.vue';

// TODO: Move pagination and modals into separate components

const initDefaultActivePostState = () => ({
  id: null,
  title: null,
  body: null
});

export default {
  name: 'Posts',
  components: {
    vPost,
    vModal,
    vButton,
    vTextField,
  },
  data: () => ({
    isRemoveModalOpened: false,
    isEditModalOpened: false,
    activePostId: null,
    activePost: initDefaultActivePostState(),
    page: 1
  }),
  computed: {
    ...mapState(usePostsStore, {
      posts: store => store.posts
    }),
    canSavePost() {
      const requiredKeys = ['title', 'body'];
      return requiredKeys.every((key) => this.activePost[key]);
    },
    paginatedPosts() {
      return this.posts.slice(this.startIndex, this.endIndex);
    },
    hasNextPage() {
      return this.posts.length > this.endIndex;
    },
    startIndex() {
      return (this.page - 1) * 10;
    },
    endIndex() {
      return this.page * 10;
    },
  },
  created() {
      this.getPosts();
  },
  methods: {
    ...mapActions(usePostsStore, {
      getPosts: postsActions.GET_POSTS,
      updatePost: postsActions.UPDATE_POST,
      removePost: postsActions.REMOVE_POST
    }),
    openEditModal(post) {
      this.activePost = { ...post };
      this.isEditModalOpened = true;
    },
    closeEditModal() {
      this.isEditModalOpened = false;
      this.resetActivePostData();
    },
    updatePostFn() {
      this.updatePost(this.activePost);
      this.closeEditModal();
    },
    openRemoveModal(post) {
      this.activePost = { ...post };
      this.isRemoveModalOpened = true;
    },
    closeRemoveModal() {
      this.isRemoveModalOpened = false;
      this.resetActivePostData();
    },
    removePostFn() {
      this.removePost(this.activePost);
      this.closeRemoveModal();
    },
    resetActivePostData() {
      this.activePost = initDefaultActivePostState();
    }
  }
}
</script>

<style scoped>
.modal-actions {
  display: flex;
  justify-content: space-around;
}

[disabled] {
  opacity: .7;
  cursor: not-allowed;
}
</style>