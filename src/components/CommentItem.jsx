import { ArrowBigUp, ArrowBigDown, MessageSquare, Trash } from "lucide-react";
import { getTimeAgo } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export const CommentItem = ({ comment }) => {
  const commentCreatedDate = new Date(comment.createdAt);
  const commentTimeSinceCreation = getTimeAgo(comment.createdAt);

  const postOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedCommentDate = new Intl.DateTimeFormat(
    "en-US",
    postOptions,
  ).format(commentCreatedDate);

  console.log({ comment });
  return !comment ? null : (
    <>
      <div className="flex p-0">
        <div className="flex flex-col gap-2 pl-12 pt-2">
          <div className="flex gap-2 text-xs">
            <p className="cursor-pointer hover:underline">
              {comment.user.username}
            </p>
            <span className="text-[#7C7C7C]">•</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-[#7C7C7C]">
                  {commentTimeSinceCreation}
                </TooltipTrigger>
                <TooltipContent>{formattedCommentDate}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-lg font-medium">{comment.title}</p>
          <p className="text-sm">{comment.text}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-bl-sm rounded-tl-sm">
              <ArrowBigUp />
              {comment.upVotes.length}
              <ArrowBigDown />
            </div>
            <span className="flex gap-1">
              <MessageSquare />
              <p>Reply</p>
            </span>
            <span>{comment.userId === comment.user.id && <Trash />}</span>
          </div>
        </div>
      </div>
      <div className="children">
        {comment.children &&
          comment.children.map((childComment) => (
            <CommentItem key={childComment.id} comment={childComment} />
          ))}
      </div>
    </>
  );
};

export default CommentItem;
