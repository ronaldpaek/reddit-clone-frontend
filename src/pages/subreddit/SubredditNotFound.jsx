import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouteError } from "react-router-dom";

export const subredditNotFoundAction = async ({ request }) => {
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

export const SubredditNotFound = () => {
  const error = useRouteError();
  console.log("error", error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <img src={dizzy} alt="Dizzy Face" className="w-[200px]" />
      <h1 className="text-lg font-bold">
        Sorry, there aren&apos;t any communities on Reddit with that name.
      </h1>
      <p>
        This community may have been banned or the community name is incorrect.
      </p>
      <div className="flex gap-2">
        <Dialog className="">
          <DialogTrigger
            variant="outline"
            className="flex w-fit rounded-full border border-blue-500 bg-white px-4 py-2 font-bold text-blue-500"
          >
            Create Community
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a community</DialogTitle>
              <DialogDescription>
                <div className="font-bold">Name</div>
                <div className="flex gap-2">
                  <span>
                    Community names including capitalization cannot be changed.
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
        <Link to="/" className="text-blue-700 underline">
          Go home
        </Link>
      </div>
    </main>
  );
};
