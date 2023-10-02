import { create } from "zustand";

export const useUserStore = create(() => ({
  user: null,
  isLoggedIn: false,
}));

export const setLoggedInUser = () =>
  useUserStore.setState({ isLoggedIn: true });

export const resetLoggedInUser = () =>
  useUserStore.setState({ isLoggedIn: false });

export const setUser = (user) => useUserStore.setState({ user });

export const resetUser = () => useUserStore.setState({ user: null });
