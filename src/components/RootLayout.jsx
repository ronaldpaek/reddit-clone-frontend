import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";

import { Navbar } from "@/components";
import { fetchAllPosts, fetchSubreddits, fetchUser } from "@/api";
import { useLocalStorage } from "@/hooks";

export const rootLayoutLoader = async () => {
  try {
    const [subreddits, allPosts, user] = await Promise.all([
      fetchSubreddits(),
      fetchAllPosts(),
      fetchUser(),
    ]);
    return { subreddits, allPosts, user };
  } catch (error) {
    return null;
  }
};

export const RootLayout = () => {
  const { subreddits, allPosts, user } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameIsNotLogin = location.pathname !== "/login";
  const [showTokenExpiredMessage, setShowTokenExpiredMessage] = useState(false);
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "darkMode",
    prefersDarkMode,
  );

  const toggleDarkMode = () => {
    console.log({ isDarkMode });
    setIsDarkMode((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (user === "tokenExpired") {
      setShowTokenExpiredMessage(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [user]);

  console.log({ user, subreddits, allPosts });

  return (
    <>
      {/* {showTokenExpiredMessage && pathnameIsNotLogin && (
        <p className="token-expired-message">
          Your token has expired. Redirecting to login...
        </p>
      )} */}
      <Navbar
        toggleSidebar={toggleSidebar}
        subreddits={subreddits}
        user={user}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main>
        <Outlet context={{ subreddits, allPosts, user }} />
      </main>
    </>
  );
};
