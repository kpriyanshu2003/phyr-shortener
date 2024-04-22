/* eslint-disable @next/next/no-img-element */
import Advertisement from "@/components/Advertisement";
import { IconRight, RightTop } from "@/static/icons";
import { Skeleton, Spinner } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function Loading() {
  return (
    <div className="h-svh pt-16">
      <div className="max-w-xl mx-auto w-full flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 512 512"
        >
          <defs>
            <symbol id="meteoconsWind0" viewBox="0 0 342 234">
              <path
                fill="none"
                stroke="black"
                stroke-dasharray="148"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="18"
                d="M264.2 21.3A40 40 0 1 1 293 89H9"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="6s"
                  repeatCount="indefinite"
                  values="0; 2960"
                />
              </path>
              <path
                fill="none"
                stroke="black"
                stroke-dasharray="110"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="18"
                d="M148.2 212.7A40 40 0 1 0 177 145H9"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="6s"
                  repeatCount="indefinite"
                  values="0; 1540"
                />
              </path>
            </symbol>
          </defs>
          <use
            width="342"
            height="234"
            href="#meteoconsWind0"
            transform="translate(85 139)"
          />
        </svg>

        <h2 className="text-2xl font-semibold mt-6">Routing in progress...</h2>
        <p className="text-base text-neutral-600 mt-6">
          our servers are verifying the request, please wait a moment
        </p>
      </div>
      <div className="flex items-center justify-center mt-20">
        <Advertisement />
      </div>
    </div>
  );
}

export default Loading;
