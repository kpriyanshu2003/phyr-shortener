"use client";

import {
  CommandIcon,
  CustomizeIcon,
  EyeClosed,
  EyeOpen,
  IconRight,
  Keyicon,
  LockIcon,
  StarIcon,
  UpIcon,
} from "@/static/icons";
import { Button, Kbd, Spacer, Switch } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [isPassEnabled, setIsPassEnabled] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div>
      <nav className="h-20">
        <div className="flex h-full items-center max-w-7xl mx-auto justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-neutral-200 rounded-full"></div>
            <h2 className=" font-semibold ml-4 text-lg">Shortener.</h2>
          </div>

          <ul className="flex items-center space-x-8 text-sm">
            <li>Home</li>
            <li>Pricing</li>
            <li>API Docs</li>
            <li>Customization</li>
            <li>Products</li>
          </ul>

          <div className="flex items-center space-x-7">
            <Button
              radius="full"
              className="bg-neutral-900 text-white w-fit px-4"
            >
              <div className="flex space-x-2 px-2 items-center">
                <span>Paste</span>
                <CommandIcon />
              </div>
            </Button>
            <button className="text-sm">Feedback</button>
          </div>
        </div>
      </nav>

      <div className="py-[1px] bg-gradient-to-r from-gray-50 to-gray-50 via-lime-100">
        <div className="py-3 bg-gradient-to-r from-white/90 to-white/90 via-white/80 flex items-center">
          <div className="w-fit flex items-center text-neutral-800 text-sm mx-auto">
            <span className="h-8 w-8 flex items-center justify-center bg-lime-100 rounded-full mr-4">
              🎉
            </span>
            <span>API documentation is now available</span>
            <span className="ml-3">
              <IconRight />
            </span>
          </div>
        </div>
      </div>

      <Spacer y={100} />

      <div className="w-full h-[400px]">
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
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Shortening link...");
                }}
              >
                <input
                  className="bg-transparent mt-5 resize-none text-neutral-200 placeholder:text-neutral-500 w-full outline-none text-sm"
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setOpen(true);
                    } else {
                      setOpen(false);
                    }
                  }}
                  type="text"
                  placeholder="paste your link here, e.g. https://example.com"
                  name=""
                  id=""
                />

                <div className="flex items-center justify-between mt-8 pb-5">
                  <Button
                    onClick={() => setOpen(!open)}
                    className={`${
                      open
                        ? "bg-stone-700 text-stone-200"
                        : "bg-stone-950 text-stone-100"
                    }`}
                    isIconOnly
                  >
                    <CustomizeIcon />
                  </Button>
                  <Button className="bg-stone-100 text-stone-900">
                    <div className="flex space-x-1">
                      <span className="">
                        <UpIcon />
                      </span>
                      <span>Shorten</span>
                    </div>
                  </Button>
                </div>
              </form>

              <div
                style={{
                  width: "100%",
                  height: open ? "170px" : "0px",
                }}
                className="transition-all duration-700 w-full mb-5 rounded-lg overflow-hidden"
              >
                <div className="h-[90%] w-full bg-neutral-700/20 rounded-lg p-5">
                  <div className="text-sm text-neutral-400 flex items-center justify-between">
                    <div className="w-fit flex items-center space-x-2">
                      <StarIcon />
                      <p>Custom alias</p>
                    </div>
                    <div className="flex items-center text-right">
                      <p>sh.phyr.in /</p>
                      <input
                        placeholder="alias"
                        id="custom-url"
                        style={{
                          width:
                            customUrl.length == 0
                              ? "30px"
                              : customUrl.length < 20
                              ? `${customUrl.length * 8 + 10}px`
                              : "170px",
                        }}
                        onChange={(e) => {
                          setCustomUrl(e.target.value);
                        }}
                        className="bg-transparent ml-1 text-neutral-200 text-left placeholder:text-neutral-500 outline-none text-sm"
                        type="text"
                        name=""
                      />
                    </div>
                  </div>
                  <div className="text-sm text-neutral-400 flex items-center justify-between mt-5">
                    <div className="w-fit flex items-center space-x-2">
                      <LockIcon />
                      <p>Potected</p>
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
                      height: isPassEnabled ? "auto" : "0px",
                    }}
                    className="text-sm text-neutral-400 flex items-center justify-between mt-5 overflow-hidden transition-all duration-300"
                  >
                    <div className="w-fit flex items-center space-x-2 pl-7">
                      <p>Set a password</p>
                    </div>
                    <div className="flex items-center text-right dark">
                      <input
                        type="text"
                        placeholder="・・・・・・・"
                        size={15}
                        className="px-3 pb-1 rounded-none bg-transparent border-neutral-600 outline-none focus-within:border-neutral-500 text-right border-b transition-all"
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
    </div>
  );
}
