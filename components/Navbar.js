/* eslint-disable @next/next/no-img-element */
"use client";
import GlobalState from "@/context/GlobalState";
import { CommandIcon, IconRight, MenuIcon } from "@/static/icons";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { url, setUrl } = useContext(GlobalState);
  const handlePaste = () => {
    if (pathname == "/") {
      navigator.clipboard
        .readText()
        .then((text) => {
          setUrl(text);
        })
        .catch((err) => {
          console.error("Failed to read clipboard contents: ", err);
        });
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <nav className="h-20">
        <div className="flex h-full items-center max-w-7xl mx-auto justify-between px-4">
          <div className="flex items-center">
            <img className="h-12" src="/logo.svg" alt="" />
            <h2 className="font-semibold ml-2 text-lg">Shortener.</h2>
          </div>

          <ul className="hidden lg:flex items-center space-x-10 text-sm">
            <li>Home</li>
            <li>API Docs</li>
            <li>Customization</li>
            <li>Pricing</li>
            <li>Products</li>
          </ul>

          <div className="flex items-center">
            <Button
              radius="full"
              onClick={() => handlePaste()}
              className="bg-neutral-900 text-white w-fit px-4"
            >
              <div className="flex space-x-2 px-2 items-center">
                <span>{pathname == "/" ? "Paste" : "Shorten"}</span>
                <CommandIcon />
              </div>
            </Button>
            <Button
              radius="full"
              isIconOnly
              className="bg-neutral-100 ml-4 lg:hidden"
            >
              <MenuIcon />
            </Button>
            <button className="text-sm hidden lg:block ml-6">Feedback</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
