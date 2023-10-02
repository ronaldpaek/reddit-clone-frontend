import { Link, useNavigate, Form, redirect } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  // Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/api";
import { setLoggedInUser, useUserStore } from "@/stores/userStore";

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Username should be at least 5 characters!")
    .max(20, "Username should be no more than 20 characters!"),
  password: z
    .string()
    .min(5, "Password should be at least 5 characters!")
    .max(20, "Password should be no more than 20 characters!"),
});

export const loginAction = async ({ request }) => {
  console.log("in action");
  const formData = await request.formData();
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    const data = await loginUser(user);

    if (!data.success) {
      return Error(data.message || "Login failed");
    }
    console.log("success");
    return redirect("/");
  } catch (error) {
    console.error(error);
  }
};

const TestingLoginForm = () => {
  return (
    <Form method="POST">
      <label htmlFor="username">Username</label>
      <Input
        type="text"
        name="username"
        id="username"
        autoComplete="username"
      />

      <label htmlFor="password">Password</label>
      <Input
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
      />

      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-bold uppercase leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Continue
      </button>
    </Form>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const data = await loginUser(values);
      if (!data.success) {
        return Error(data.message || "Login failed");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-bold uppercase leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Log in
        </Button>
      </form>
    </Form>
  );
};

export const Login = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh_-_49px)] flex-1">
        <div className="relative block basis-[calc(122px_+_1vw)]">
          <img
            className="absolute inset-0 h-full w-full object-cover object-left-top"
            src="/login-bg.png"
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-6">
          <div>
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                User Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="w-full max-w-sm lg:w-80">
            <div className="mt-10">
              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="#"
                  className="flex w-full items-center gap-2 rounded-full border border-[#dadce0] bg-white px-3 py-1.5 text-black hover:bg-blue-100 focus:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  <span className="flex-1 text-center text-sm font-semibold leading-6">
                    Continue with Google
                  </span>
                </a>

                <a
                  href="#"
                  className="flex w-full items-center gap-2 rounded-full border border-[#dadce0] bg-white px-3 py-1.5 text-black hover:bg-blue-100 focus:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-100"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-1 text-center text-sm font-semibold leading-6">
                    Continue with Github
                  </span>
                </a>
              </div>
              <div className="mt-10 flex items-center">
                <div className="mr-6 flex-grow border-t border-gray-200"></div>
                <span className="text-sm font-medium leading-6 text-gray-900">
                  OR
                </span>
                <div className="ml-6 flex-grow border-t border-gray-200"></div>
              </div>

              <div>
                {/* <LoginForm /> */}
                <TestingLoginForm />
                <div className="mt-4 flex flex-col gap-6 text-sm leading-6">
                  <p>
                    Forgot your&nbsp;
                    <Link
                      to="/username"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      username
                    </Link>
                    &nbsp;or&nbsp;
                    <Link
                      to="/password"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      password
                    </Link>
                    ?
                  </p>
                  <p>
                    New to Reddit?&nbsp;
                    <Link
                      to="/register"
                      className="font-bold uppercase text-blue-600 hover:text-blue-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
