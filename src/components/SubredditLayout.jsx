import {
  Outlet,
  useOutletContext,
  useLoaderData,
  NavLink,
} from "react-router-dom";

import { fetchSubredditPosts } from "@/api";

export const subredditLayoutLoader = async ({ request, params }) => {
  try {
    console.log("request in subredditLayoutLoader", request);
    const { subredditName } = params;
    const data = await fetchSubredditPosts(subredditName);
    console.log(data);
    if (data.success) {
      const { posts, subredditCreatedAt } = data;
      return { subredditPosts: posts, subredditCreatedAt, subredditName };
    }
  } catch (error) {
    throw error;
  }
};

export const SubredditLayout = () => {
  console.log("in the subreddit layout");
  const { user, subreddits } = useOutletContext();
  const { subredditPosts, subredditName, subredditCreatedAt } = useLoaderData();
  console.log("user in subredditLayout", user);
  console.log("subredditPosts in subredditLayout", subredditPosts);
  return (
    <>
      {/* <nav className="subreddit-nav">
        <ul>
          <li>
            <NavLink to={`/r/${subredditName}`}>Posts</NavLink>
          </li>
        </ul>
      </nav> */}
      <Outlet
        context={{
          user,
          subredditPosts,
          subredditCreatedAt,
          subredditName,
          subreddits,
        }}
      />
    </>
  );
};
