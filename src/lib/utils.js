import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInHours, differenceInDays } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export const slugify = (str) => {
//   if (!str) return;
//   let slug = str.toLowerCase().replace(/ /g, "_");

//   if (slug.length <= 50) {
//     return slug;
//   }

//   const words = slug.split("_");
//   let result = "";
//   let length = 0;

//   for (let word of words) {
//     if (length + word.length <= 50) {
//       if (result) {
//         result += "_";
//       }
//       result += word;
//       length += word.length + 1; // +1 for the underscore
//     } else {
//       break;
//     }
//   }

//   return result;
// };

// export const getFirstEightChars = (str) => str.slice(0, 8);

export const getTimeAgo = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const hoursDifference = differenceInHours(now, postDate);
  const daysDifference = differenceInDays(now, postDate);

  if (daysDifference > 0) {
    return `${daysDifference} days ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`;
  } else {
    return "Just now";
  }
};
