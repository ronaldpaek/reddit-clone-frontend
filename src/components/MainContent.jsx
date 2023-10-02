import { useOutletContext, Link } from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  Image,
  Link as LinkIcon,
  MessageSquare,
  Trash,
} from "lucide-react";
import { differenceInHours, differenceInDays } from "date-fns";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { getTimeAgo } from "@/lib/utils";
import { deletePost } from "@/api";

const MainContent = () => {
  const { allPosts, user, subreddits } = useOutletContext();
  console.log({ allPosts, user, subreddits });

  return !user ? (
    <ul>
      {allPosts?.map((post) => {
        const timeAgo = getTimeAgo(post.createdAt);

        return (
          <li key={post.id}>
            <p>r/{post.subreddit.name}</p>
            <p>{timeAgo}</p>
            <p>{post.title}</p>
            <p>{post.text}</p>
            <span className="flex">
              <ArrowBigUp />
              {post.upVotes}
              <ArrowBigDown />
            </span>
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="min-h-[calc(100vh_-_49px)] justify-center bg-slate-300 px-6 py-5 lg:grid lg:grid-cols-[minmax(0,_700px)_325px] lg:gap-x-4">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 items-center gap-2 bg-white p-2">
          <div className="relative flex">
            <Avatar>
              <AvatarImage src="/avatar-reddit.png" />
            </Avatar>
            {user.isOnline && (
              <div className="absolute bottom-0 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            )}
            <div className="absolute bottom-0 left-1 -z-[1] h-8 w-8  rounded-full bg-slate-200" />
          </div>
          <Link to="/submit" className="flex-1">
            <Input placeholder="Create Post" className="" />
          </Link>
          <div>
            <Button variant="outline">
              <Image />
            </Button>
            <Button variant="outline">
              <LinkIcon />
            </Button>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {allPosts?.map((post) => {
            const now = new Date();
            const createdAt = new Date(post.createdAt);
            const hoursDifference = differenceInHours(now, createdAt);
            const daysDifference = differenceInDays(now, createdAt);
            let timeAgo;
            if (daysDifference > 0) {
              timeAgo = `${daysDifference} days ago`;
            } else if (hoursDifference > 0) {
              timeAgo = `${hoursDifference} hours ago`;
            } else {
              timeAgo = "Just now";
            }
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            };
            const formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options,
            ).format(createdAt);
            return (
              <Card key={post.id} className="rounded-sm">
                <CardContent className="grid grid-cols-[40px_minmax(0,_1fr)] p-0">
                  <div className="flex flex-col items-center rounded-bl-sm rounded-tl-sm bg-slate-100">
                    <ArrowBigUp />
                    {post.upVotes.length}
                    <ArrowBigDown />
                  </div>

                  <div className="flex flex-col gap-2 p-2">
                    <div className="flex gap-2 text-xs">
                      <Link to={`r/${post.subreddit.name}`}>
                        r/{post.subreddit.name}
                      </Link>
                      <span>•</span>
                      <p>Posted by u/{post.user.username}</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{timeAgo}</TooltipTrigger>
                          <TooltipContent>{formattedDate}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Link
                      key={post.id}
                      to={`/r/${post.subreddit.name}/comments/${post.id}`}
                    >
                      <p className="text-lg font-medium">{post.title}</p>
                      <p className="text-sm">{post.text}</p>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1.5">
                        <MessageSquare />
                        <p>{post.commentCount} comments</p>
                      </span>
                      {post.userId === user.id && (
                        <Button
                          variant="ghost"
                          className="flex gap-2"
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash />
                          <p>Delete</p>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <div className="home hidden bg-white p-3 lg:flex lg:flex-col lg:gap-4">
          <div className="relative z-10 flex items-end gap-4 pt-1.5 font-medium">
            <img src="/snoo-home.png" alt="" className="h-[68px]" />
            <p className="mb-2">Home</p>
          </div>
          <p className="text-sm">
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </p>
          <Separator />
          <div className="flex flex-col gap-2">
            <Button className="rounded-full">Create Post</Button>
            <Button className="rounded-full">Create Community</Button>
          </div>
        </div>
        <div className="hidden bg-white p-3 text-xs lg:grid lg:grid-cols-2 lg:gap-2">
          <a href="#">User Agreement</a>
          <a href="#">Content Policy</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Moderator Code Of Conduct</a>
          <Separator className="col-span-2" />
          <a href="#">English</a>
          <a href="#">Deutsch</a>
          <a href="#">Français</a>
          <a href="#">Español</a>
          <a href="#">Italiano</a>
          <a href="#">Português</a>
          <Separator className="col-span-2" />
          <p>Reddit, Inc. © 2023. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
