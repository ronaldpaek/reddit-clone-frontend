import { Link, useNavigate, useRevalidator } from "react-router-dom";

import {
  Menu,
  Search,
  MoreHorizontal,
  LogIn,
  MousePointerClick,
  Store,
  ArrowLeft,
  ChevronDown,
  UserCircle2,
  Eye,
  PlusCircle,
  Megaphone,
  Sailboat,
  LogOut,
  ArrowUpRightFromCircle,
  MessageCircle,
  Bell,
  Plus,
  Shield,
} from "lucide-react";

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Combobox } from "@/components/ui/combobox";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { logoutUser } from "@/api";
import { BASE_URL } from "@/constants";

const Navbar = ({
  toggleSidebar,
  subRedditList,
  user,
  isDarkMode,
  toggleDarkMode,
}) => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log({ revalidator });
      revalidator.revalidate();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePremiumToggle = async () => {
    // Send the updated status to the server
    try {
      const response = await fetch(`${BASE_URL}/toggle-premium`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        revalidator.revalidate();
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error updating premium status:", error);
    }
  };

  const handleToggleOnlineStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/toggle-online-status`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        revalidator.revalidate();
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error toggling online status:", error);
    }
  };

  return (
    <header className="border-b">
      <nav className="flex h-12 flex-col justify-center px-5">
        <ul className="flex items-center justify-between">
          {!user?.id ? (
            <>
              <span className="flex items-center">
                <SidebarToggleButton
                  toggleSidebar={toggleSidebar}
                  subRedditListData={subRedditList}
                />
                <Logo />
              </span>
              {/* <span className="flex items-center"> */}
              {/* <SearchDialogButton /> */}

              {!user?.id && (
                <Button className="rounded-full bg-[#DA3B01] px-3 py-5 hover:bg-[#962900] active:bg-[#7E2201]">
                  <Link to="/login" className="whitespace-nowrap">
                    Log in
                  </Link>
                </Button>
              )}
              {/* <SettingsMenuButton /> */}
              {/* </span> */}
            </>
          ) : (
            <>
              <Logo />
              {/* <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center border p-0">
                  <div className="relative flex">
                    <Avatar>
                      <AvatarImage src="/home.svg" />
                    </Avatar>
                  </div>
                  <ChevronDown className="h-10" />
                </DropdownMenuTrigger>
              </DropdownMenu> */}
              <Combobox />
              <SearchBar />
              <div className="mr-4 hidden items-center gap-2 sm:flex">
                {/* <ArrowUpRightFromCircle size={20} /> */}
                <Button variant="icon" className="px-2 hover:bg-[#E8E8E8]">
                  <MessageCircle size={20} />
                </Button>
                <Button variant="icon" className="px-2 hover:bg-[#E8E8E8]">
                  <Bell size={20} />
                </Button>
                <Link to="/submit">
                  <Button variant="icon" className="px-2 hover:bg-[#E8E8E8]">
                    <Plus size={20} />
                  </Button>
                </Link>
                {/* <Megaphone size={20} /> */}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center border p-0">
                  <div className="flex items-center">
                    <div className="relative flex">
                      <Avatar>
                        <AvatarImage src="/avatar-reddit.png" />
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                      )}
                      <div className="absolute bottom-0 left-1 -z-[1] h-8 w-8  rounded-full bg-slate-200" />
                    </div>
                    <div className="hidden lg:block">
                      <p className="flex items-center gap-1 text-sm font-medium">
                        <span>{user.username}</span>
                        <img
                          src="/shield.svg"
                          alt="Premium Icon"
                          className={
                            user.isPremium ? "opacity-100" : "opacity-0"
                          }
                        />
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="h-10" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="-translate-x-9 -translate-y-0.5 p-0">
                  <DropdownMenuLabel className="flex items-center gap-3 px-4 text-slate-500">
                    <UserCircle2 size={20} /> My Stuff
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="pl-12 pr-4"
                      preventClose={true}
                    >
                      <div className="flex w-full items-center justify-between">
                        <Label htmlFor="online-status">Online Status</Label>
                        <Switch
                          id="online-status"
                          checked={user.isOnline}
                          onCheckedChange={handleToggleOnlineStatus}
                        />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pl-12 pr-4 font-medium">
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pl-12 pr-4 font-medium">
                      <Link to="/settings">User Settings</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="flex items-center gap-3 px-4 text-slate-500">
                    <Eye size={20} />
                    View Options
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="pl-12 pr-4"
                      preventClose={true}
                    >
                      <div className="flex w-full items-center justify-between">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <Switch
                          id="dark-mode"
                          checked={isDarkMode}
                          onCheckedChange={toggleDarkMode}
                        />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-3 px-4 font-medium">
                      <PlusCircle size={20} />
                      Create a Community
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem className="flex items-center gap-3 px-4 font-medium">
                      <Megaphone size={20} />
                      Advertise on Reddit
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      className="flex items-center gap-3 px-4 font-medium"
                      preventClose={true}
                    >
                      <div className="flex w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Shield size={20} />
                          <Label htmlFor="online-status">Premium</Label>
                        </span>
                        <Switch
                          id="online-status"
                          checked={user.isPremium}
                          onCheckedChange={handlePremiumToggle}
                        />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 px-4 font-medium">
                      <Sailboat size={20} />
                      Explore
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex items-center gap-3 px-4 font-medium"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    Log Out
                  </DropdownMenuItem>
                  <DropdownMenuLabel className="text-slate-500">
                    Reddit, Inc. © 2023. All rights reserved.
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const SearchDialogButton = () => {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <FaceIcon className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <RocketIcon className="mr-2 h-4 w-4" />
            <span>Launch</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            <span>Mail</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>

    // <li className="shrink-0">
    //   <Dialog>
    //     <DialogTrigger className="flex h-10 w-10 items-center justify-center">
    //       <Search className="h-5 w-5" />
    //     </DialogTrigger>
    //     <DialogContent
    //       className="left-0 right-0 top-0 flex max-w-full translate-x-0 translate-y-0 items-center gap-2 px-0 py-1.5 text-foreground sm:rounded-none"
    //       overlayTransparent
    //       showCloseIcon={false}
    //     >
    //       <DialogTrigger className="ml-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100">
    //         <ArrowLeft />
    //       </DialogTrigger>
    //       <SearchBar />
    //     </DialogContent>
    //   </Dialog>
    // </li>
  );
};

const SettingsMenuButton = () => {
  return (
    <>
      <li className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger className="-mr-2 h-10 w-10 rounded-full p-2 hover:bg-slate-700 active:bg-slate-800">
            <MoreHorizontal className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-foreground text-background">
            <DropdownMenuItem className="flex gap-2">
              <LogIn className="h-5 w-5" />
              <Link to="/login">Log in / Sign Up</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2">
              <MousePointerClick className="h-5 w-5" />
              <a href="#">Advertise on Reddit</a>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2">
              <Store className="h-5 w-5" />
              <Link to="/avatar/shop">Shop Collectible Avatars</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <li className="sm:hidden">
        <Dialog>
          <DialogTrigger className="-mr-2 h-10 w-10 rounded-full p-2 hover:bg-slate-700 active:bg-slate-800">
            <MoreHorizontal className="h-5 w-5" />
          </DialogTrigger>
          <DialogContent
            className="bottom-0 left-0 right-0 top-auto max-w-full translate-x-0 translate-y-0 bg-foreground text-background"
            overlayTransparent
            showCloseIcon={false}
          >
            <ul>
              <li className="flex gap-2">
                <LogIn className="h-5 w-5" />
                <Link to="/login">Log in / Sign Up</Link>
              </li>
              <li className="flex gap-2">
                <MousePointerClick className="h-5 w-5" />
                <a href="#">Advertise on Reddit</a>
              </li>
              <li className="flex gap-2">
                <Store className="h-5 w-5" />
                <Link to="/avatar/shop">Shop Collectible Avatars</Link>
              </li>
            </ul>
          </DialogContent>
        </Dialog>
      </li>
    </>
  );
};

const Logo = () => {
  return (
    <li className="mr-4 lg:mr-0">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <img
          src="/reddit-logo.svg"
          alt="Reddit"
          className="mr-5 hidden h-[18px] lg:block"
        />
      </Link>
    </li>
  );
};

const SidebarToggleButton = ({ subRedditList }) => {
  return (
    <Dialog className="">
      <DialogTrigger className="-ml-2 rounded-full p-2 hover:bg-slate-700 active:bg-slate-800 lg:hidden">
        <Menu className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent
        className="left-0 top-[49px] flex max-w-[264px] translate-x-0 translate-y-0 flex-col bg-foreground text-background"
        overlayTransparent
        showCloseIcon={false}
      >
        <DialogHeader>
          <DialogTitle>Topics</DialogTitle>
        </DialogHeader>
        <ul className="bg-blue-700">
          {subRedditList?.map((subReddit) => {
            return (
              <li key={subReddit.id}>
                <a href={subReddit.url}>{subReddit.name}</a>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

const SearchBar = () => {
  return (
    <div className="relative mx-4 flex flex-1 items-center">
      <Input
        type="text"
        placeholder="Search Reddit"
        className="rounded-full px-8"
      />
      <Search className="absolute left-3 w-4" />
    </div>
  );
};

export default Navbar;
