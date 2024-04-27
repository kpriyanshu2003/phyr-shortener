/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Features from "@/components/Fragments/Features";
import GlobalState from "@/context/GlobalState";
import { createLink } from "@/prisma/cmd";
import {
  CustomizeIcon,
  EyeClosed,
  EyeOpen,
  LockIcon,
  RightTop,
  StarIcon,
  UpIcon,
} from "@/static/icons";
import { Button, Kbd, Spacer, Switch } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import randomstring from "randomstring";
import { validateUrl } from "@/utils/validateURL";
import Advertisement from "@/components/Advertisement";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const { url, setUrl } = useContext(GlobalState);
  const [password, setPassword] = useState("");
  const [isPassEnabled, setIsPassEnabled] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState({
    url: "",
    publicId: "",
    analyticsId: "",
  });

  const saveToHistory = async (url, shortenId, analyticsId, isProtected) => {
    let history = localStorage.getItem("shortening-history")
      ? JSON.parse(localStorage.getItem("shortening-history"))
      : [];
    history.push({
      url: url,
      shortenId: shortenId,
      analyticsId: analyticsId,
      isProtected: isProtected,
      date: new Date().toLocaleString(),
    });
    localStorage.setItem("shortening-history", JSON.stringify(history));
  };

  const handleSubmit = async () => {
    if (validateUrl(url, customUrl, isPassEnabled, password) == true) {
      setIsLoading(true);
      toast.loading("Shortening URL...");
      let ip = await axios.get("/api/ip");

      let tempOBJ = {
        url: url.trim(),
        publicId: customUrl.trim(),
        ipAddr: ip.data,
        password: password.trim(),
      };

      createLink(JSON.stringify(tempOBJ))
        .then((res) => {
          if (res.success) {
            let shortUrl = "https://sh.phyr.in/" + res.link.publicId;
            setShortenedUrl({
              url: shortUrl,
              publicId: res.link.publicId,
              analyticsId: res.link.analyticsId,
            });
            setOpen(false);
            toast.remove();
            setIsLoading(false);
            toast.success("Success");
            saveToHistory(
              url,
              res.link.publicId,
              res.link.analyticsId,
              password.length > 0 ? true : false
            );
          } else {
            toast.remove();
            toast.error(res.message);
            console.log(res.message);
            setIsLoading(false);
          }
        })
        .catch((e) => console.error(e));
    }
  };

  const calculateReduction = (original, shortened) => {
    let result = 0;
    if (original.length > shortened.length) {
      result = Math.floor(
        ((original.length - shortened.length) / original.length) * 100
      );
    }
    return result;
  };

  useEffect(() => {
    if (url.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [url]);

  useEffect(() => {
    if (!isPassEnabled) setPassword("");
  }, [isPassEnabled]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && (e.key === "v" || e.key === "V")) {
        navigator.clipboard
          .readText()
          .then((text) => {
            setUrl(text);
          })
          .catch((err) => {
            console.error("Failed to read clipboard contents: ", err);
          });
      } else if (e.metaKey && (e.key === "v" || e.key === "V")) {
        navigator.clipboard
          .readText()
          .then((text) => {
            setUrl(text);
          })
          .catch((err) => {
            console.error("Failed to read clipboard contents: ", err);
          });
      }
    });
    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  return (
    <div>
      <Banner />
      <div className="w-full p-5 mt-12 md:mt-20">
        <div className="max-w-3xl mx-auto h-full">
          <h2 className="text-4xl md:text-4xl text-center font-semibold leading-[1.5]">
            Shorten. Share. Analyze.
          </h2>
          <p className="text-center mt-4 leading-8 text-gray-500 text-sm">
            Shorten your long URLs, share them with your friends, and analyze
            them for free.
          </p>
          <div className="w-full mx-auto max-w-xl bg-stone-900 shadow-xl shadow-neutral-300 rounded-xl mt-8">
            <div className="px-5">
              <form
                autoComplete="off"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleSubmit();
                }}
              >
                <input
                  className="bg-transparent mt-5 resize-none text-neutral-200 placeholder:text-neutral-500 w-full outline-none text-sm"
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  value={url}
                  type="text"
                  placeholder="paste your link here (https://example.com)"
                  name=""
                  id="main-url"
                />

                <div className="flex items-center justify-between mt-8 pb-5">
                  <Button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`${
                      open
                        ? "bg-stone-900 text-stone-200 border border-neutral-600"
                        : "bg-stone-950 text-stone-100 border border-stone-900"
                    }`}
                    isIconOnly
                  >
                    <CustomizeIcon />
                  </Button>
                  <Button
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    className="bg-stone-100 text-stone-900"
                    type="submit"
                  >
                    <div className="flex space-x-1">
                      {isLoading == false && (
                        <span className="">
                          <UpIcon />
                        </span>
                      )}
                      <span>Shorten</span>
                    </div>
                  </Button>
                </div>
              </form>

              <div
                style={{
                  width: "100%",
                  height: open ? (isPassEnabled ? "250px" : "180px") : "0px",
                  paddingBottom: open
                    ? isPassEnabled
                      ? "20px"
                      : "20px"
                    : "0px",
                  opacity: open ? 1 : 0,
                }}
                className="transition-all duration-500 w-full mb-5 rounded-lg overflow-hidden"
              >
                <div className="h-[100%] w-full bg-neutral-700/20 rounded-lg p-5">
                  <div className="text-sm text-neutral-400 flex items-center justify-between">
                    <div className="w-fit flex items-center space-x-2">
                      <span className="text-neutral-300">
                        <StarIcon />
                      </span>
                      <p>Custom alias</p>
                    </div>
                  </div>
                  <div className="flex whitespace-nowrap bg-neutral-950 py-3 rounded-md items-center text-right text-neutral-300 ml-1 pl-4 mt-4 text-sm">
                    <p className=" shrink-0">sh.phyr.in /</p>
                    <input
                      placeholder="custom-brand-url"
                      autoComplete="off"
                      autoCapitalize="off"
                      id="custom-url"
                      value={customUrl}
                      onChange={(e) => {
                        setCustomUrl(e.target.value);
                      }}
                      className="bg-transparent w-full pl-1 appearance-none text-neutral-200 text-left placeholder:text-neutral-500 outline-none text-sm"
                      type="text"
                      name=""
                    />
                  </div>
                  <div className="text-sm text-neutral-400 flex items-center justify-between mt-5">
                    <div className="w-fit flex items-center space-x-2">
                      <span className="text-neutral-200">
                        <LockIcon />
                      </span>
                      <p>Protected</p>
                    </div>
                    <div className="flex items-center text-right dark">
                      <Switch
                        value={isPassEnabled}
                        onChange={() => setIsPassEnabled(!isPassEnabled)}
                        size="sm"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: isPassEnabled ? "50px" : "0px",
                      marginTop: isPassEnabled ? "20px" : "0px",
                      opacity: isPassEnabled ? 1 : 0,
                    }}
                    className="text-sm text-neutral-400 flex items-center justify-between overflow-hidden transition-all duration-500"
                  >
                    <div className="w-fit flex items-center space-x-2 border-l border-neutral-500 ml-2 pl-4 md:pl-7">
                      <p>Password</p>
                    </div>
                    <div className="flex items-center text-right dark">
                      <input
                        type={isPassVisible ? "text" : "text"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="・・・・・・・"
                        className="px-3 pb-1 w-32 rounded-none bg-transparent text-neutral-100 border-neutral-600 outline-none focus-within:border-neutral-500 text-right border-b transition-all"
                        name=""
                        id=""
                      />
                      <button
                        onClick={() => setIsPassVisible(!isPassVisible)}
                        className="ml-3 text-neutral-100"
                      >
                        {isPassVisible ? <EyeOpen /> : <EyeClosed />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-0 items-center justify-center">
        <Link href="/h">
          <div className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3">
            <span>History</span>
            <RightTop />
          </div>
        </Link>
        <Link href="/h">
          <div className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3">
            <span>Analytics</span>
            <RightTop />
          </div>
        </Link>
      </div>
      <img
        src="https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Faebc98ba-7fef-4b55-8763-12f7b76f46ec_1620x1080.png"
        className="h-32 mx-auto mt-16"
        alt=""
      />
      <Features />
      <div className="flex items-center justify-center mt-32 px-5">
        <Advertisement />
      </div>

      <AnimatePresence>
        {shortenedUrl.url.length != 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10 h-full w-full bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center"
            ></motion.div>
          </>
        )}
        {shortenedUrl.url.length != 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-10 h-full w-full flex items-center justify-center"
            >
              <div className="w-[97%] md:w-[600px] bg-white rounded-lg relative">
                <button
                  onClick={() => {
                    setShortenedUrl({ url: "", publicId: "" });
                    setCustomUrl("");
                    setUrl("");
                    setIsPassEnabled(false);
                    setPassword("");
                  }}
                  className="absolute top-4 right-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.7"
                      d="m18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6"
                    />
                  </svg>
                </button>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold">
                      Congratulations &nbsp; 🎉
                    </h2>
                  </div>
                  <p className="text-base text-neutral-600 leading-8 mt-3 md:mt-4">
                    thousands of urls are shortened. but this one is special
                    &nbsp; ❤️
                  </p>

                  <div className="px-4 py-3 relative text-base mt-12 rounded-lg bg-stone-50 flex items-center overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M2 4.5V6h3.586a.5.5 0 0 0 .353-.146L7.293 4.5L5.939 3.146A.5.5 0 0 0 5.586 3H3.5A1.5 1.5 0 0 0 2 4.5m-1 0A2.5 2.5 0 0 1 3.5 2h2.086a1.5 1.5 0 0 1 1.06.44L8.207 4H12.5A2.5 2.5 0 0 1 15 6.5v.757a5.5 5.5 0 0 0-1-.657v-.1A1.5 1.5 0 0 0 12.5 5H8.207l-1.56 1.56A1.5 1.5 0 0 1 5.585 7H2v4.5A1.5 1.5 0 0 0 3.5 13h2.707q.149.524.393 1H3.5A2.5 2.5 0 0 1 1 11.5zm9.55 3.65c-.29.727-.493 1.722-.54 2.85h2.98c-.047-1.128-.25-2.123-.54-2.85c-.167-.417-.353-.722-.535-.914c-.18-.19-.32-.236-.415-.236s-.235.046-.415.236c-.182.192-.368.497-.535.914m-.72-.83a5 5 0 0 0-.209.459C9.277 8.64 9.056 9.766 9.01 11H7.027A4.5 4.5 0 0 1 9.83 7.32m3.34 0q.112.218.208.459c.345.862.565 1.987.612 3.221h1.982a4.5 4.5 0 0 0-2.802-3.68M15.972 12H13.99c-.047 1.234-.267 2.36-.612 3.221q-.096.24-.208.459A4.5 4.5 0 0 0 15.972 12M11.5 16c.094 0 .235-.046.415-.236c.182-.192.368-.497.535-.914c.29-.727.493-1.722.54-2.85h-2.98c.047 1.128.25 2.123.54 2.85c.167.417.353.722.535.914c.18.19.32.236.415.236m-1.67-.32A4.5 4.5 0 0 1 7.026 12H9.01c.047 1.234.268 2.36.612 3.221q.097.24.208.459"
                      />
                    </svg>
                    <a
                      className="ml-4 text-neutral-800"
                      href={shortenedUrl.url}
                      target="_blank"
                    >
                      {shortenedUrl.url}
                    </a>

                    <div className="absolute right-0 inset-y-0 h-full w-12 p-1 flex items-center justify-center">
                      <Button
                        onClick={() => {
                          try {
                            if (
                              navigator.clipboard.writeText(shortenedUrl.url)
                            ) {
                              toast.success("Copied to clipboard");
                            }
                          } catch (error) {
                            toast.error("Failed to copy to clipboard");
                          }
                        }}
                        radius="sm"
                        isIconOnly
                        className="bg-lime-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1z" />
                            <path d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054M15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                          </g>
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center mt-6 space-x-2">
                    <Link
                      href={shortenedUrl.url}
                      className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3"
                    >
                      <span>Open url</span>
                      <RightTop />
                    </Link>
                    <Link
                      href={`/a/${shortenedUrl.analyticsId}`}
                      className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3"
                    >
                      <span>Analytics</span>
                      <RightTop />
                    </Link>
                  </div>

                  <p className="mt-16 leading-7 text-sm text-neutral-600">
                    😇 &nbsp; Your shortened url contains{" "}
                    {calculateReduction(url, shortenedUrl.url)}% fewer
                    characters than the original url.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
