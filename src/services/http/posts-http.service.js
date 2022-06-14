import { Fetch } from '@/modules/Fetch';
import { getApiUrl } from '@/services/common/app.service';

const routes = {
  posts: 'posts',
  postById: `posts/{postId}`
};

export function getPosts(params) {
  // FIXME: Make server side pagination when 'count' endpoint will be implemented at the api side
  const url = `${getApiUrl()}/${routes.posts}`;
  return Fetch.get(url, params);
}

export function getPostById(id) {
  const url = `${getApiUrl()}/${routes.postById}`
    .replace('{postId}', id);
  return Fetch.get(url);
}

export function createPost(data) {
  const url = `${getApiUrl()}/${routes.posts}`;
  return Fetch.post(url, data);
}

export function updatePost(id, data) {
  const url = `${getApiUrl()}/${routes.postById}`
    .replace(`{postId}`, id);
  return Fetch.put(url, data);
}

export function removePost(id) {
  const url = `${getApiUrl()}/${routes.postById}`
    .replace('{postId}', id);
  return Fetch.del(url);
}

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  removePost,
}
