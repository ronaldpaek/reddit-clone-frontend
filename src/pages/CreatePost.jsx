import { useLocation, Form, redirect } from "react-router-dom";
import {
  ScrollText,
  Image,
  Link,
  ListOrdered,
  AlertCircle,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/constants";

export const createSubredditAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name");

    const response = await fetch(`${BASE_URL}/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return redirect(`/r/${data.subreddit.name}`);
    }
  } catch (error) {
    console.error("Error in createSubredditAction:", error.message);
    return null;
  }
};

export const createPostAction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const text = formData.get("text");
};

export const CreatePost = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postType = queryParams.get("type") || "text";

  if (postType === "media") {
  } else if (postType === "link") {
  }

  return (
    <div className="grid min-h-[calc(100vh_-_49px)] gap-6 bg-[#DAE0E5] px-2 sm:px-8 lg:grid-cols-[minmax(0,_740px)_300px] lg:justify-center">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between py-4">
          <h2 className="h-8 font-medium">Create a post</h2>

          <Button
            className="flex h-8 gap-1 rounded-full hover:bg-slate-200"
            variant="ghost"
          >
            <h2 className="font-bold uppercase text-blue-500">Drafts</h2>
            <span className="li-0.5 rounded-[2px] bg-[#7E8183] text-white">
              0
            </span>
          </Button>
        </div>
        <Separator className="bg-[#EDEFF1]" />
        {/* <Combobox /> */}

        <Tabs defaultValue="post" className="flex flex-col">
          <TabsList className="flex justify-between">
            <TabsTrigger value="post" className="flex flex-grow gap-2">
              <ScrollText size={20} />
              Post
            </TabsTrigger>
            <TabsTrigger value="media" className="flex flex-grow gap-2">
              <Image size={20} />
              Image & Video
            </TabsTrigger>
            <TabsTrigger value="url" className="flex flex-grow gap-2">
              <Link size={20} />
              Link
            </TabsTrigger>
            <TabsTrigger value="poll" className="flex flex-grow gap-2">
              <ListOrdered size={20} />
              Poll
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Form method="POST" className="flex flex-col gap-2">
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input type="text" id="title" name="title" placeholder="Title" />
              <label htmlFor="text" className="sr-only">
                Text (optional)
              </label>
              <textarea
                id="text"
                name="text"
                placeholder="Text (optional)"
                rows="3"
              />
              <Dialog className="">
                <DialogTrigger
                  variant="outline"
                  className="flex w-fit rounded-full border border-blue-500 bg-white px-4 py-2 font-bold text-blue-500"
                >
                  Create a new community
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a community</DialogTitle>
                    <DialogDescription>
                      <div className="font-bold">Name</div>
                      <div className="flex gap-2">
                        <span>
                          Community names including capitalization cannot be
                          changed.
                        </span>
                        <AlertCircle size={20} />
                      </div>
                      <Form method="POST">
                        <label htmlFor="name" className="sr-only">
                          Name
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-1.5">r/</span>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="border pl-4 font-bold"
                          />
                        </div>
                        <div className="mt-4 flex justify-end gap-4">
                          <button className="rounded-full border border-blue-500 px-3 py-1.5">
                            Cancel
                          </button>
                          <button className="rounded-full border bg-blue-500 px-3 py-1.5 text-white">
                            Create Community
                          </button>
                        </div>
                      </Form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button className="w-fit self-end rounded-full">Post</Button>
            </Form>
          </TabsContent>
          <TabsContent value="media">Create Media</TabsContent>
          <TabsContent value="url">Create Url</TabsContent>
          <TabsContent value="poll">Create Poll</TabsContent>
        </Tabs>
      </div>
      <Card className="mt-11 hidden h-fit flex-col p-3 text-sm font-medium lg:flex">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2 border-b border-l-0 border-r-0 border-t-0 border-b-[#DAE0E6] pb-2">
            <img
              src="/posting-reddit.svg "
              alt="Posting to Reddit"
              className="h-11 w-11"
            />
            <CardTitle>Posting to Reddit</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ol className="flex list-decimal flex-col">
            <li className="my-2 ml-4">Remember the human</li>
            <Separator />
            <li className="my-2 ml-4">Behave like you would in real life</li>
            <Separator />
            <li className="my-2 ml-4">
              Look for the original source of content
            </li>
            <Separator />
            <li className="my-2 ml-4">Search for duplicates before posting</li>
            <Separator />
            <li className="my-2 ml-4">Read the community&apos;s rules</li>
            <Separator />
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
