"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const location = usePathname();
  const routes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "History",
      path: "/history",
    },
    {
      name: "Help",
      path: "/help",
    },
  ];

  return (
    <nav className="flex items-center justify-between bg-white px-10 py-3 border-b border-solid border-gray-200 shadow-lg">
      <div>
        <h2 className="text-4xl font-bold uppercase">logo</h2>
      </div>
      <div className="gap-6 hidden md:flex">
        {routes.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className={`hover:underline underline-offset-4 cursor-pointer hover:text-blue-500 transition-all duration-500 hover:scale-95 ${
              location === route.path ? "text-blue-500 font-bold" : ""
            }`}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
