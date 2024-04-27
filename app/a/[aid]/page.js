/* eslint-disable react-hooks/rules-of-hooks */

import { getAnalytics } from "@/prisma/analytics";
import { IconRight, RightTop } from "@/static/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

async function page({ params }) {
  let { success, analytics } = await getAnalytics(params.aid);
  let shortUrl = `https://sh.phyr.in/${analytics.analytics.publicId}`;

  const calculateReduction = (original, shortened) => {
    let result = 0;
    if (original.length > shortened.length) {
      result = Math.floor(
        ((original.length - shortened.length) / original.length) * 100
      );
    }
    return result;
  };

  return (
    <div className="pt-8">
      <h2 className="text-2xl md:text-2xl text-center font-semibold leading-[1.5] mt-5">
        Analytics Report
      </h2>
      <p className="text-sm text-center mt-3 text-neutral-500">
        Impressions and clicks on your shortened url
      </p>

      <div className="w-full max-w-[500px] max-h-[500px] mt-10 relative mx-auto">
        <img src="/ball-an.png" className="opacity-90" alt="" />
        <div className="absolute inset-0 h-full w-full flex-col flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M144 18h-32a62.07 62.07 0 0 0-62 62v96a62.07 62.07 0 0 0 62 62h32a62.07 62.07 0 0 0 62-62V80a62.07 62.07 0 0 0-62-62m50 62v26h-60V30h10a50.06 50.06 0 0 1 50 50m-72-50v35.51L91.09 34.6A49.74 49.74 0 0 1 112 30ZM80.62 41.11L122 82.49V106h-7.51L66.9 58.42a50.3 50.3 0 0 1 13.72-17.31M62 80a50.17 50.17 0 0 1 .78-8.73L97.51 106H62Zm82 146h-32a50.06 50.06 0 0 1-50-50v-58h132v58a50.06 50.06 0 0 1-50 50"
            />
          </svg>
          <h1 className="text-[100px] md:text-[130px] font-mono mt-0 font-thin">
            {analytics.clicks}
          </h1>
          <p className="mt-0 text-neutral-900">clicks registered so far</p>
          <Link href={shortUrl} className="block mt-8">
            <Button className="w-fit rounded-full bg-black text-white">
              <div className="flex items-center space-x-2 px-2">
                <span>Open</span>
                <RightTop />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mt-16 mx-auto px-5">
        <p className="mt-16 leading-7 text-center text-sm text-neutral-800 bg-gray-100 w-fit mx-auto px-3 py-2 rounded-lg">
          😇 &nbsp; Your shortened url contains{" "}
          {calculateReduction(analytics.analytics.url, shortUrl)}% fewer
          characters than the original url.
        </p>
      </div>
    </div>
  );
}

export default page;
