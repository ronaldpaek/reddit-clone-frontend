import { Link } from "react-router-dom";

import dizzy from "/dizzy.svg";

export const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <img src={dizzy} alt="Dizzy Face" className="w-[200px]" />
      <h1 className="text-lg font-bold">Something went wrong</h1>
      <Link to="/" className="text-blue-700 underline">
        Go home
      </Link>
    </main>
  );
};
