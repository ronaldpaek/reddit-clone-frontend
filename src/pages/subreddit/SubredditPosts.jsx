import { useOutletContext, Link, Form } from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  Image,
  Link as LinkIcon,
  MessageSquare,
  Trash,
  CakeSlice,
} from "lucide-react";
import { differenceInHours, differenceInDays } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export const SubredditPosts = () => {
  const {
    subreddits,
    user,
    subredditPosts,
    subredditName,
    subredditCreatedAt,
  } = useOutletContext();
  const subredditPostOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const subredditCreatedDate = new Date(subredditCreatedAt);
  const subredditTimeSinceCreation = getTimeAgo(subredditCreatedAt);
  const formattedSubredditDate = new Intl.DateTimeFormat(
    "en-US",
    subredditPostOptions,
  ).format(subredditCreatedDate);
  console.log("subredditPosts", subredditPosts);

  return (
    <>
      {user && (
        <>
          <div className="">
            <div className="h-20 bg-[#34A8FF]"></div>
            <div className="h-20">
              <div className="-m-[14px] mx-auto mb-3 flex max-w-5xl items-center gap-4">
                <Avatar className="h-[72px] w-[72px] border-4 border-white">
                  <AvatarImage src="/subreddit-default.svg" alt="" />
                </Avatar>
                <div className="">
                  <h1 className="text-3xl font-bold">{subredditName}</h1>
                  <p>r/{subredditName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-[calc(100vh_-_49px)] justify-center bg-slate-300 px-6 py-5 lg:grid lg:grid-cols-[minmax(0,_640px)_310px] lg:gap-x-6">
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
                  <Input
                    placeholder="Create Post"
                    className="bg-[#F6F7F8] text-[#757575]"
                  />
                </Link>
                <div>
                  <Button
                    variant="icon"
                    className="h-[38px] w-[38px] p-0 hover:bg-[#EDEDED] active:bg-[#C9C9C9]"
                  >
                    <Image size={20} />
                  </Button>
                  <Button
                    variant="icon"
                    className="h-[38px] w-[38px] p-0 hover:bg-[#EDEDED] active:bg-[#C9C9C9]"
                  >
                    <LinkIcon size={20} />
                  </Button>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5">
                {subredditPosts?.map((post) => {
                  const postCreatedDate = new Date(post.createdAt);
                  const postTimeSinceCreation = getTimeAgo(post.createdAt);
                  const postOptions = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  };

                  const formattedPostDate = new Intl.DateTimeFormat(
                    "en-US",
                    postOptions,
                  ).format(postCreatedDate);
                  return (
                    <Card key={post.id} className="rounded-sm">
                      <Link
                        to={`/r/${post.subreddit.name}/comments/${post.id}`}
                      >
                        <CardContent className="grid grid-cols-[40px_minmax(0,_1fr)] p-0">
                          <div className="flex flex-col items-center rounded-bl-sm rounded-tl-sm bg-slate-100">
                            <ArrowBigUp />
                            {post.upVotes.length}
                            <ArrowBigDown />
                          </div>

                          <div className="flex flex-col gap-2 p-2">
                            <div className="flex gap-2 text-xs">
                              <p>Posted by u/{post.user.username}</p>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    {postTimeSinceCreation}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {formattedPostDate}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <p className="text-lg font-medium">{post.title}</p>
                            <p className="text-sm">{post.text}</p>
                            <div className="flex items-center gap-2">
                              <span className="flex gap-1.5">
                                <MessageSquare />
                                <p>{post.children.length} comments</p>
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
                      </Link>
                    </Card>
                  );
                })}
              </ul>
            </div>
            <aside className="flex flex-col gap-4">
              <div className="hidden bg-white lg:flex lg:flex-col">
                <div className="items-center gap-4 bg-[#0079D3] p-3 font-medium">
                  <h3 className="text-sm font-bold text-white">
                    About Community
                  </h3>
                </div>
                <div className="p-3">
                  <Form>
                    <button
                      type="button"
                      className="mb-3 mt-2 w-full rounded-sm border border-[#DAE0E6] bg-[#F6F7F8] p-2 text-left text-xs font-bold text-[#0079D3] hover:border-[#0079D3]"
                    >
                      Add description
                    </button>
                  </Form>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center text-sm text-[#7C7C7C]">
                          <CakeSlice className="-scale-x-100 text-black" />
                          <span className="ml-2">Created&nbsp;</span>
                          <time datetime={subredditCreatedAt}>
                            {formattedSubredditDate}
                          </time>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="translate-x-14 translate-y-14">
                        {subredditTimeSinceCreation}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Separator className="my-4" />
                  <div className="flex flex-col gap-2">
                    <Button className="h-8 rounded-full bg-[#0079D3] font-bold hover:bg-[#2984D7] active:bg-[#549ADE]">
                      Create Post
                    </Button>
                  </div>
                </div>
              </div>
              <div className="hidden bg-white text-xs lg:flex lg:flex-col">
                <div className="items-center gap-4 bg-[#0079D3] p-3 font-medium">
                  <h3 className="text-sm font-bold text-white">
                    {`r/${subredditName}`} Rules
                  </h3>
                </div>

                <Accordion type="single" collapsible className="p-3">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      1. Self Promotion spam
                    </AccordionTrigger>
                    <AccordionContent>
                      "It's perfectly fine to be a redditor with a website, it's
                      not okay to be a website with a reddit account." -
                      Confucius
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  );
};
