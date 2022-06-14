import { createRouter, createWebHistory } from 'vue-router';

const Posts = () => import('@/views/pages/Posts/Posts.vue');

const routes = [
  {
    path: '',
    component: Posts
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
