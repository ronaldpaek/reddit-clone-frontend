import { useLoaderData, useOutletContext } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MainNavigationSidebar = ({ isOpen }) => {
  const { subRedditList } = useOutletContext();
  // console.log({ subRedditListData }, subRedditListData.length);

  if (!isOpen) return null;

  return (
    <ul className="bg-blue-700">
      {subRedditList?.map((subReddit) => {
        return (
          <li key={subReddit.id}>
            <a href={subReddit.url}>{subReddit.name}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default MainNavigationSidebar;
