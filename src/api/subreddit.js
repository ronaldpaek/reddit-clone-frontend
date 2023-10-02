import { BASE_URL } from "@/constants";

export const fetchSubreddits = async () => {
  const response = await fetch(`${BASE_URL}/subreddits`);
  const data = await response.json();
  const { subreddits } = data;
  return subreddits;
};

export const fetchSubredditPosts = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/subreddits/${name}`);
    console.log("name", name);

    const data = await response.json();
    console.log(data);
    if (!data.success) {
      throw {
        error: data.error,
        message: "No subreddit found with that name.",
      };
    }

    return data;
  } catch (error) {
    console.log("in here");
    return null;
  }
};
