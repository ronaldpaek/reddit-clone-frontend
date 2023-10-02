"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HomeIcon } from "@/components/icons";

const subreddits = [
  {
    id: 0,
    name: "home",
    displayName: "Home",
    description: "Your personalized dashboard or overview.",
    imageUrl: "/home.svg",
  },
  {
    id: 1,
    name: "r/programmingbuddies",
    displayName: "r/ProgrammingBuddies",
    description: "ProgrammingBuddies()",
    imageUrl: "/programmingbuddies-icon.png",
  },
  {
    id: 2,
    name: "r/learnprogramming",
    displayName: "r/learnprogramming",
    description: "learn programming",
    imageUrl: "/community-icon.png",
  },
  {
    id: 3,
    name: "r/frontend",
    displayName: "r/Frontend",
    description: "Bringing the web out of 2007 since 2013.",
    imageUrl: "/reddit-icon.png",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [selectedSubreddit, setSelectedSubreddit] = React.useState(
    subreddits[0],
  );
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex w-[70px] justify-between lg:w-[250px]"
        >
          <span className="hidden lg:block">
            {selectedSubreddit?.displayName}
          </span>
          <Avatar className="h-5 w-5 lg:hidden">
            <AvatarImage src={selectedSubreddit?.imageUrl} alt="" />
          </Avatar>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative left-[68px]
      w-[250px] p-0 lg:left-0"
      >
        <Command>
          <CommandInput placeholder="Filter subreddits..." className="h-9" />
          <CommandEmpty>No subreddits found.</CommandEmpty>
          <CommandGroup>
            <div>Hello</div>
            {subreddits.map((subreddit) => (
              <CommandItem
                key={subreddit.id}
                onSelect={(name) => {
                  setSelectedSubreddit(
                    subreddits.find((subreddit) => subreddit.name === name) ||
                      null,
                  );
                  setOpen(false);
                }}
                className="flex gap-2"
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src={subreddit.imageUrl} alt="" />
                </Avatar>
                {subreddit.displayName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
