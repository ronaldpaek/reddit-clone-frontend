// import { useOutletContext, useLoaderData } from "react-router-dom";
// import { ArrowBigUp, ArrowBigDown, MessageSquare, Trash } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { fetchPost } from "@/api";
// import { getTimeAgo } from "@/lib/utils";
// import { CommentItem } from "@/components";

// export const postLoader = async ({ params }) => {
//   try {
//     const { postId } = params;
//     const post = await fetchPost(postId);
//     return post;
//   } catch (error) {
//     return null;
//   }
// };

// export const Post = () => {
//   const post = useLoaderData();
//   const timeAgo = getTimeAgo(post.createdAt);
//   console.log(post);

//   return (
//     <div>
//       <div key={post.id} className="rounded-sm">
//         <div className="grid grid-cols-[40px_minmax(0,_1fr)] p-0">
//           <div className="flex flex-col items-center rounded-bl-sm rounded-tl-sm bg-slate-100">
//             <ArrowBigUp />
//             {post.upVotes.length}
//             <ArrowBigDown />
//           </div>

//           <div className="flex flex-col gap-2 p-2">
//             <div className="flex gap-2 text-xs">
//               <p>r/{post.subreddit.name}</p>
//               <span>•</span>
//               <p>Posted by u/{post.user.username}</p>
//               <p>{timeAgo}</p>
//             </div>
//             <p className="text-lg font-medium">{post.title}</p>
//             <p className="text-sm">{post.text}</p>
//             <span>
//               <MessageSquare />
//               <span>{post.children.length}</span>
//             </span>
//             {post.userId === userId && Delete}
//             {/* <Trash /> */}
//           </div>
//         </div>
//         <div className="comments">
//           {post.children &&
//             post.children.map((comment) => (
//               <Comment key={comment.id} comment={comment} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };
