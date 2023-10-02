import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import {
  NotFound,
  Home,
  Login,
  loginAction,
  Register,
  registerAction,
  CreatePost,
  AvatarShop,
  createSubredditAction,
} from "@/pages";
import {
  SubredditNotFound,
  SubredditPosts,
  PostComments,
  postCommentsLoader,
  postCommentsAction,
} from "@/pages/subreddit";
import {
  RootLayout,
  rootLayoutLoader,
  SubredditLayout,
  subredditLayoutLoader,
} from "@/components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      loader={rootLayoutLoader}
      errorElement={<NotFound />}
      element={<RootLayout />}
    >
      <Route index element={<Home />} />
      <Route path="login" action={loginAction} element={<Login />} />
      <Route path="register" action={registerAction} element={<Register />} />
      <Route
        path="submit"
        action={createSubredditAction}
        element={<CreatePost />}
      />
      <Route
        path="r/:subredditName"
        loader={subredditLayoutLoader}
        element={<SubredditLayout />}
      >
        <Route index element={<SubredditPosts />} />
        <Route
          path="comments/:postId"
          loader={postCommentsLoader}
          // action={postCommentsAction}
          element={<PostComments />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const App = () => <RouterProvider router={router} />;

export default App;
