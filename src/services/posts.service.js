import PostsHttpService from '@/services/http/posts-http.service';

export function getPosts(params) {
  return PostsHttpService.getPosts(params);
}

export function getPostById(id) {
  return PostsHttpService.getPostById(id);
}

export function createPost(data) {
  return PostsHttpService.createPost(data);
}

export function updatePost(id, data) {
  return PostsHttpService.updatePost(id, data);
}

export function removePost(id) {
  return PostsHttpService.removePost(id);
}

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  removePost,
}