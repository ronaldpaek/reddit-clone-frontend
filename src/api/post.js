import { BASE_URL } from "@/constants";

export const fetchAllPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  const { posts } = data;
  return posts;
};

export const fetchPost = async (id) => {
  console.log("in the fetch");
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data = await response.json();
  const { post } = data;
  return post;
};

export const deletePost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  const { post } = data;
  return post;
};

export const createPost = async (postData) => {
  console.log({ postData });
  console.timeLog('inside the create')
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    credentials: "include",
  });

  const data = await response.json();
  const { post } = data;
  return post;
};
