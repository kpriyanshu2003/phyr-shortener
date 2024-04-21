import { CommandIcon, IconRight } from "@/static/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function Invalid() {
  return (
    <div className="h-[calc(60vh)]">
      <div className="max-w-xl mx-auto pt-20">
        <div className="flex mx-auto items-center rounded-full bg-lime-300 justify-center text-neutral-900 h-16 w-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1"
            >
              <path d="M10 13.154V21m5-12.615v2.769a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2.77a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2Zm-1.667-2V3M6.667 6.385V3" />
              <path
                stroke-linejoin="round"
                d="m15.121 21.364l2.122-2.121m0 0l2.121-2.122m-2.121 2.122L15.12 17.12m2.122 2.122l2.121 2.121"
              />
            </g>
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-center mt-8">
          Target not found. 😤
        </h1>
        <p className="text-center mt-4 leading-8 text-neutral-500">
          The link you are trying to access does not exist. Please check the URL
          and try again.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Link href="/">
            <Button
              radius="full"
              className="bg-neutral-200 text-neutral-800 w-fit px-4"
            >
              <div className="flex space-x-2 px-2 items-center">
                <span>Shorten fresh</span>
                <IconRight />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Invalid;
