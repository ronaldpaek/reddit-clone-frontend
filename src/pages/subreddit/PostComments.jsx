import {
  useOutletContext,
  Link,
  NavLink,
  Form,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  Image,
  Link as LinkIcon,
  MessageSquare,
  Trash,
  CakeSlice,
  Bell,
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
import { createPost, fetchPost } from "@/api";

import { CommentItem } from "@/components";
import { BASE_URL } from "@/constants";

export const postCommentsLoader = async ({ params }) => {
  try {
    console.log({ params });
    const { postId } = params;
    const postComments = await fetchPost(postId);
    console.log("in postCommentsLoader");
    return postComments;
  } catch (error) {
    return null;
  }
};

export const postCommentsAction = async ({ request, params }) => {
  //   const url = new URL(request.url).searchParams.get("message");
  //   console.log(url);
  //   console.log("in postCommentsAction", params);
  //   console.log("in postCommentsAction", request);
  //   // console.log
  //   try {
  //     let formData = await request.formData();
  //     console.log("in postCommentsAction", formData);
  //     let comment = formData.get("comment");
  //     console.log("in postCommentsAction", comment);
  //     const data = await createPost({
  //       comment,
  //       postId: params.postId,
  //       subreddit,
  //     });
  //     return redirect(`/r/${data.subreddit.name}`);
  //   } catch (error) {
  //     console.error("Error in postCommentsAction:", error.message);
  //     return null;
  //   }
};

export const PostComments = () => {
  const {
    user,
    subredditPosts,
    subredditName,
    subredditCreatedAt,
    subreddits,
  } = useOutletContext();
  const postComments = useLoaderData();
  const subredditPostOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const postCommentsCreatedDate = new Date(postComments.createdAt);
  const postCommentsTimeSinceCreation = getTimeAgo(postCommentsCreatedDate);
  const formattedPostCommentsDate = new Intl.DateTimeFormat(
    "en-US",
    subredditPostOptions,
  ).format(postCommentsCreatedDate);

  const navigate = useNavigate();

  console.log(postComments);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    console.log(subreddits, subredditName, subredditPosts, subredditCreatedAt);
    console.log("in handleCommentSubmit");
    const formData = new FormData(event.target);
    const comment = formData.get("comment");

    const subreddit = subreddits.find(
      (subreddit) => subreddit.name === subredditName,
    );
    console.log("test");
    const data = await createPost({
      comment,
      postId: postComments.id,
      subredditId: subreddit.id,
    });
    navigate(`/r/${subredditName}/comments/${postComments.id}`);
  };

  return (
    <>
      {user && (
        <>
          <div className="">
            <div className="bg-[#34A8FF]">
              <div className="mx-auto flex h-16 w-[1200px] items-center gap-2 sm:h-20">
                <img
                  src="/subreddit-second.svg"
                  alt=""
                  className="rounded-full border border-white"
                />
                <h1 className="text-2xl font-medium text-white">
                  r/{subredditName}
                </h1>
              </div>
            </div>
            <div className="h-[26px] bg-[#DCF0FF]">
              <div className="mx-auto mb-3 flex max-w-[1200px] items-center gap-4 ">
                <nav className="subreddit-nav">
                  <ul>
                    <li>
                      <NavLink
                        to={`/r/${subredditName}`}
                        className="px-2 pb-[1px] pt-1"
                      >
                        Posts
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="min-h-[calc(100vh_-_49px)] justify-center bg-slate-300 px-6 py-5 lg:grid lg:grid-cols-[minmax(0,_640px)_310px] lg:gap-x-6">
            <div className="flex flex-col rounded-sm bg-white">
              <div className="flex pt-2">
                <div className="flex basis-10 flex-col items-center rounded-bl-sm rounded-tl-sm">
                  <ArrowBigUp />
                  {postComments.upVotes.length}
                  <ArrowBigDown />
                </div>
                <div>
                  <div className="mb-2 ml-2 flex h-auto gap-2 text-xs text-[#787C7E]">
                    <p>Posted by u/{postComments.user.username}</p>
                    <p>{postCommentsTimeSinceCreation}</p>
                  </div>
                  <p className="mb-3 ml-2 text-xl font-medium">
                    {postComments.title}
                  </p>
                  <p className="mb-3 ml-2 mt-3 text-sm">{postComments.text}</p>
                  <div className="ml-2 mt-3 flex items-center gap-2">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare />
                      <span>{postComments.commentCount}</span>
                    </span>
                    <span>{postComments.userId === user.id && <Trash />}</span>
                  </div>
                </div>
              </div>
              <div className="my-6 ml-12 mr-10">
                <p className="mb-1 text-xs">
                  Comment as&nbsp;
                  <a href="#" className="text-[#0466B3] hover:underline">
                    {user.username}
                  </a>
                </p>
                <form
                  onSubmit={handleCommentSubmit}
                  className="mb-6 flex flex-col"
                >
                  <textarea
                    className="round-small h-[175px] border border-[#EEEFF1]"
                    placeholder="What are your thoughts?"
                    name="comment"
                  />
                  <div className="item-center flex justify-end bg-[#F6F7F8] py-1.5">
                    <button
                      type="submit"
                      className="mr-2 rounded-full bg-[#0079D3] px-6 py-1 text-xs font-bold text-white"
                    >
                      Comment
                    </button>
                  </div>
                </form>
                <div>
                  <Input
                    type="text"
                    placeholder="Search comments"
                    className="w-1/2"
                  />
                </div>
                <Separator className="mt-2" />
              </div>
              <div className="comments">
                {postComments.children &&
                  postComments.children.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
              </div>
            </div>
            <aside className="flex flex-col gap-4">
              <div className="hidden bg-white lg:flex lg:flex-col">
                <div className="items-center gap-4 bg-[#0079D3] p-3 font-medium">
                  <h3 className="text-sm font-bold text-white">
                    About Community
                  </h3>
                </div>
                <div className="p-3">
                  <form>
                    <button
                      type="button"
                      className="mb-3 mt-2 w-full rounded-sm border border-[#DAE0E6] bg-[#F6F7F8] p-2 text-left text-xs font-bold text-[#0079D3] hover:border-[#0079D3]"
                    >
                      Add description
                    </button>
                  </form>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center text-sm text-[#7C7C7C]">
                          <CakeSlice className="-scale-x-100 text-black" />
                          <span className="ml-2">Created&nbsp;</span>
                          <time dateTime={postCommentsCreatedDate}>
                            {formattedPostCommentsDate}
                          </time>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="translate-x-14 translate-y-14">
                        {postCommentsTimeSinceCreation}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Separator className="my-4" />
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
