/* eslint-disable @next/next/no-img-element */
"use client";
import GlobalState from "@/context/GlobalState";
import { CommandIcon, IconRight, MenuIcon } from "@/static/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Banner from "./Banner";
import Advertisement from "./Advertisement";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { url, setUrl } = useContext(GlobalState);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          <Link href="/">
            <div className="flex items-center">
              <img className="h-12" src="/logo.svg" alt="" />
              <h2 className="font-semibold ml-2 text-lg">Shortener.</h2>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center space-x-10 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="https://phyrs-studios.gitbook.io/shortener-by-phyr/shorten-a-new-link">
                API Docs
              </Link>
            </li>
            <li>
              <Link href="/#features">Features</Link>
            </li>
            <li>
              <Link href="/h">History</Link>
            </li>
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
              onClick={() => setSidebarOpen(true)}
              radius="full"
              isIconOnly
              className="bg-neutral-100 ml-4 lg:hidden"
            >
              <MenuIcon />
            </Button>

            <a
              href="https://phyr.global/feedback?project=Phyr%20link%20shortener"
              className="text-sm hidden lg:block ml-6"
            >
              Feedback
            </a>
          </div>
        </div>
      </nav>
      <>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-20 fixed inset-0 h-full w-full bg-gradient-to-t from-black/50 to-black/60"
            ></motion.div>
          )}
          {sidebarOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.7 }}
              className="z-20 fixed inset-0 h-full w-full bg-transparent"
            >
              <div className="w-full bg-white py-4">
                <div className="flex items-center justify-end px-4">
                  <Button
                    onClick={() => setSidebarOpen(false)}
                    isIconOnly
                    className="bg-lime-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={12}
                        strokeDashoffset={12}
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.4s"
                          values="12;0"
                        ></animate>
                      </path>
                    </svg>
                  </Button>
                </div>
                <Link href="/" className="w-fit">
                  <div className="flex items-center px-6">
                    <img className="h-12" src="/logo.svg" alt="" />
                    <h2 className="font-semibold ml-2 text-2xl">Shortener.</h2>
                  </div>
                </Link>
                <p className="text-sm text-neutral-600 px-6 mt-2">
                  The easiest way to shorten your links.
                </p>
                <ul className="space-y-7 mt-12 px-6 text-base">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="https://phyrs-studios.gitbook.io/shortener-by-phyr/shorten-a-new-link">
                      API Docs
                    </Link>
                  </li>
                  <li>
                    <Link href="/#features">Features</Link>
                  </li>
                  <li>
                    <Link href="/h">History</Link>
                  </li>
                </ul>

                <div className="px-5 mt-16 mb-7">
                  <Advertisement />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </>
  );
}

export default Navbar;
