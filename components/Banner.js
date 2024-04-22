import { IconRight } from "@/static/icons";
import React from "react";

function Banner() {
  return (
    <div className="py-[1px] bg-gradient-to-r from-neutral-100 to-neutral-100 via-lime-200">
      <div className="py-2 bg-gradient-to-r from-white/90 to-white/90 via-white/90 flex items-center">
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
  );
}

export default Banner;
