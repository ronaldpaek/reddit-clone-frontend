import { redirect } from "react-router-dom";

import { BASE_URL } from "@/constants";

export const fetchUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/token`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    if (data.message === "Token is expired.") return "tokenExpired";
    if (data.message === "No token provided.") return null;
    if (data.message === "Failed to authenticate token.") return null;

    const { user } = data;
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  // console.log("loginUser", response);
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};
