/* eslint-disable @next/next/no-img-element */
import { RightTop } from "@/static/icons";
import Link from "next/link";
import React from "react";

function Advertisement() {
  return (
    <Link href="https://phyr.global" className="w-fit mx-auto">
      <div className="w-fit flex items-center bg-white border rounded-xl border-neutral-200 p-3 shadow-xl shadow-neutral-100/0 transition-all hover:shadow-neutral-200 hover:scale-100">
        <div className="h-14 w-14 rounded-md bg-lime-300 p-2 shrink-0">
          <img src="/phyr-logo.svg" className="h-full w-full" alt="" />
        </div>
        <div className="ml-4">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Phyr Studios</h3>
            <RightTop />
          </div>
          <p className="text-sm mt-1 text-neutral-600 line-clamp-1">
            design, develop, and deploy digital products.
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Advertisement;
