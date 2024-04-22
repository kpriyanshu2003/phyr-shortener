import { IconRight } from "@/static/icons";
import { Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

function Loading() {
  return (
    <div className="h-[80vh] pt-16">
      <div className="max-w-xl mx-auto w-full flex flex-col justify-center items-center">
        <div className="text-gray-600">
          <Spinner color="current" />
        </div>
        <h2 className="text-2xl font-semibold mt-6">Redirecting ...</h2>
        <p className="text-sm text-neutral-600 mt-4">
          our servers are verifying the request, please wait
        </p>
      </div>
    </div>
  );
}

export default Loading;
