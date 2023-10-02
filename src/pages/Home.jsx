import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { Navbar, MainNavigationSidebar, MainContent } from "@/components";

export const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useOutletContext();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  console.log("user in home", user);
  return (
    <>
      {/* <Navbar toggleSidebar={toggleSidebar} /> */}
      <MainNavigationSidebar isOpen={isSidebarOpen} />
      <MainContent />
    </>
  );
};
