/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Features from "@/components/Fragments/Features";
import GlobalState from "@/context/GlobalState";
import { createLink } from "@/prisma/link";
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

export default function Home() {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const { url, setUrl } = useContext(GlobalState);
  const [tempUrl, setTempUrl] = useState(url);
  const [password, setPassword] = useState("");
  const [isPassEnabled, setIsPassEnabled] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const IsUrlValid = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    var localhost = new RegExp(
      "^(https?:\\/\\/)?(localhost)(:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
      "i"
    );

    return !!pattern.test(str) || !!localhost.test(str);
  };

  const handleSubmit = async () => {
    if (!isPassEnabled) setPassword("");
    if (url.length === 0) {
      toast.error("URL is required");
      return;
    } else if (!IsUrlValid(url)) {
      toast.error("Page URL is invalid");
      return;
    } else if (customUrl.length > 0 && customUrl.length < 3) {
      toast.error("Custom URL must be at least 3 characters long");
      return;
    } else if (customUrl.length > 0 && customUrl.length > 20) {
      toast.error("Custom URL must be at most 20 characters long");
      return;
    } else if (isPassEnabled && password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else {
      setIsLoading(true);
      toast.loading("Shortening URL...");
      let ip =
        process.env.NODE_ENV === "development"
          ? randomstring.generate(6)
          : await axios.get("/api/ip");

      let uObj = {
        url: url.trim(),
        publicId: customUrl.trim(),
        ipAddr: ip,
        password: password.trim(),
      };

      createLink(uObj)
        .then((res) => {
          if (res.success) {
            console.log(
              (process.env.NODE_ENV === "development"
                ? "http://localhost:3000/"
                : "https://sh.phyr.in/") + res.link.publicId
            );
            toast.remove();
            setIsLoading(false);
            toast.success("Success");
          } else {
            toast.remove();
            toast.error(res.error);
            setIsLoading(false);
          }
        })
        .catch((e) => console.error(e));
    }
  };

  useEffect(() => {
    if (url.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [url]);

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
      <Spacer y={100} />

      <div className="w-full">
        <div className="max-w-3xl mx-auto h-full">
          <h2 className="text-4xl text-center font-semibold">
            Shorten. Share. Analyze.
          </h2>
          <p className="text-center mt-4 text-gray-500 text-sm">
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
                  placeholder="paste your link here, e.g. https://example.com"
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
                    <div className="w-fit flex items-center space-x-2 border-l border-neutral-500 ml-2 pl-7">
                      <p>Set a password</p>
                    </div>
                    <div className="flex items-center text-right dark">
                      <input
                        type={isPassVisible ? "text" : "text"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="・・・・・・・"
                        size={15}
                        className="px-3 pb-1 rounded-none bg-transparent text-neutral-100 border-neutral-600 outline-none focus-within:border-neutral-500 text-right border-b transition-all"
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

      <div className="flex gap-3 mt-7 items-center justify-center">
        <div className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3">
          <span>History</span>
          <RightTop />
        </div>
        <div className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3">
          <span>Analytics</span>
          <RightTop />
        </div>
      </div>

      <img
        src="https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Faebc98ba-7fef-4b55-8763-12f7b76f46ec_1620x1080.png"
        className="h-32 mx-auto mt-16"
        alt=""
      />

      <Features />

      <div className="flex items-center justify-center mt-32">
        <Link href="https://phyr.global" className="w-fit mx-auto">
          <div className="w-fit flex items-center border rounded-xl border-neutral-200 p-3 shadow-xl shadow-neutral-100/0 transition-all hover:shadow-neutral-200 hover:scale-100">
            <div className="h-14 w-14 rounded-md bg-lime-300 p-2">
              <img src="/phyr-logo.svg" className="h-full w-full" alt="" />
            </div>
            <div className="ml-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">Phyr Studios</h3>
                <RightTop />
              </div>
              <p className="text-sm mt-1 text-neutral-600">
                design, develop, and deploy digital products.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
