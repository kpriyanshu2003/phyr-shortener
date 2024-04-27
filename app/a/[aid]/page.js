/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */

import { getAnalytics } from "@/prisma/analytics";
import { IconRight, RightTop } from "@/static/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import AnimatedCount from "../components/AnimatedNumbers";

async function page({ params }) {
  let { success, analytics } = await getAnalytics(params.aid);
  console.log(success);
  let shortUrl = analytics
    ? `https://sh.phyr.in/${analytics.analytics.publicId}`
    : "";

  const calculateReduction = (original, shortened) => {
    let result = 0;
    if (original.length > shortened.length) {
      result = Math.floor(
        ((original.length - shortened.length) / original.length) * 100
      );
    }
    return result;
  };

  if (success) {
    return (
      <div className="pt-8">
        <h2 className="text-2xl relative z-10 md:text-2xl text-center font-semibold leading-[1.5] mt-5">
          Analytics Report
        </h2>
        <p className="text-sm relative z-10 text-center mt-3 text-neutral-500">
          Impressions and clicks on your shortened url
        </p>

        <div className="w-full max-w-[500px] max-h-[500px] mt-10 relative mx-auto">
          <img src="/ball-an.png" className="opacity-90 scale-125" alt="" />
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
            <div className="text-[100px] md:text-[130px] font-mono mt-0 font-thin">
              <AnimatedCount max={analytics.clicks} />
            </div>
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

        <div className="max-w-3xl mt-16 mx-auto px-5 relative">
          <p className="mt-16 leading-7 text-center text-sm text-neutral-800 bg-gray-100 w-fit mx-auto px-3 py-2 rounded-lg">
            😇 &nbsp; Your shortened url contains{" "}
            {calculateReduction(analytics.analytics.url, shortUrl)}% fewer
            characters than the original url.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pt-8">
        <div className="flex mx-auto items-center rounded-full bg-lime-300 justify-center text-neutral-900 h-16 w-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 2048 2048"
          >
            <path
              fill="currentColor"
              d="M896 640h128v1408H896zM372 244q-58 58-103 126t-77 144t-47 155t-17 163q0 82 16 162t48 156t76 143t104 127l-91 91q-136-137-208-311T0 832q0-193 72-367t209-312zm1267-91q136 137 208 311t73 368q0 193-72 367t-209 312l-91-91q58-58 103-126t77-144t47-155t17-163q0-82-16-162t-48-156t-76-143t-104-127zm-272 272q81 81 125 186t44 221q0 115-44 220t-125 187l-90-90q63-63 96-145t34-172q0-89-33-171t-97-146zm-724 90q-63 63-97 145t-34 172q0 89 34 171t97 146l-90 90q-81-81-125-186t-44-221q0-115 44-220t125-187z"
            />
          </svg>
        </div>
        <h2 className="text-2xl relative z-10 md:text-2xl text-center font-semibold leading-[1.5] mt-5">
          Not much to see here
        </h2>
        <p className="text-sm relative z-10 text-center mt-3 text-neutral-500">
          Register some clicks on your shortened url to see analytics
        </p>
      </div>
    );
  }
}

export default page;
