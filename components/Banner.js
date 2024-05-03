import { IconRight } from "@/static/icons";
import Link from "next/link";
import React from "react";

function Banner() {
  return (
    <div className="py-[1px] bg-gradient-to-r from-neutral-100 to-neutral-100 via-lime-200">
      <div className="py-2 bg-gradient-to-r from-white/90 to-white/90 via-white/90 flex items-center">
        <Link
          className="mx-auto"
          href="https://phyrs-studios.gitbook.io/shortener-by-phyr/shorten-a-new-link"
        >
          <div className="w-fit flex items-center text-neutral-800 text-sm mx-auto">
            <span className="h-8 w-8 flex items-center justify-center bg-lime-100 rounded-full mr-4">
              🎉
            </span>
            <span className="mr-2">API documentation is now available</span>
            <IconRight />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
