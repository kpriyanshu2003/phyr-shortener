"use client";
import { RightTop } from "@/static/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    let res = localStorage.getItem("shortening-history")
      ? JSON.parse(localStorage.getItem("shortening-history"))
      : [];
    setHistory(res);
  };

  const HistoryCard = ({ data, index }) => {
    return (
      <div className="py-4 px-6 rounded-2xl bg-gray-50 hover:shadow-md hover:shadow-neutral-500/10 transition-all">
        <div className="flex items-center space-x-3 text-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.75 3.935v-1.31a.75.75 0 1 0-1.5 0v1.25h-8.5v-1.25a.75.75 0 1 0-1.5 0v1.31a4.76 4.76 0 0 0-4 4.69v8.75A4.75 4.75 0 0 0 7 22.125h10a4.75 4.75 0 0 0 4.75-4.75v-8.75a4.76 4.76 0 0 0-4-4.69m2.5 5.94H3.75v-1.25a3.24 3.24 0 0 1 2.5-3.15v1.15a.75.75 0 0 0 1.5 0v-1.25h8.5v1.25a.75.75 0 1 0 1.5 0v-1.15a3.24 3.24 0 0 1 2.5 3.15z"
            />
          </svg>
          <span className="text-sm">12 Apr 2024</span>
        </div>
        <h2 className="text-xl font-semibold mt-6">{data.shortenId}</h2>
        <div className="flex items-center space-x-3 mt-3 text-neutral-700">
          <span className="text-sm">
            {data.url.length > 15 ? data.url.slice(0, 15) + "..." : data.url}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M13.483 4.47a.75.75 0 0 1 1.06 0l6.988 7a.75.75 0 0 1 0 1.06l-6.988 7a.75.75 0 0 1-1.061-1.06l5.709-5.719L3 12.762a.75.75 0 0 1-.002-1.5l16.194-.01l-5.711-5.722a.75.75 0 0 1 0-1.06"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-sm">sh.phyr.in/{data.shortenId}</span>
        </div>
        <div className="flex gap-3 items-center mt-5">
          <Link href={`/a/${data.analyticsId}`}>
            <button className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3">
              <span>Analytics</span>
              <RightTop />
            </button>
          </Link>
          <Link href={`https://sh.phyr.in/${data.shortenId}`} target="_blank">
            <button className="border flex items-center rounded-full border-neutral-300 text-neutral-700 text-sm py-1 px-3">
              <span>Open</span>
              <RightTop />
            </button>
          </Link>

          <Button
            isIconOnly
            onClick={() => deleteHistory(index)}
            className="bg-lime-200 ml-auto h-10 w-10 rounded-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z"
              />
            </svg>
          </Button>
        </div>
      </div>
    );
  };

  const deleteHistory = (index) => {
    let res = localStorage.getItem("shortening-history")
      ? JSON.parse(localStorage.getItem("shortening-history"))
      : [];
    res.splice(index, 1);
    localStorage.setItem("shortening-history", JSON.stringify(res));
    setHistory(res);
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div className="pt-10">
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="m30.51 17.69l-6-3.55a.996.996 0 0 0-1.02 0l-6 3.55a.999.999 0 0 0-.49.86v6.9a1 1 0 0 0 .49.86l6 3.55a.996.996 0 0 0 1.02 0l6-3.55a.999.999 0 0 0 .49-.86v-6.9a1 1 0 0 0-.49-.86M29 24.88l-5 2.958l-5-2.958v-5.76l5-2.958l5 2.958z"
          />
          <path
            fill="currentColor"
            d="M14 26H9c-4.411 0-8-3.589-8-8c0-3.718 2.599-6.936 6.158-7.778A9.967 9.967 0 0 1 17 2c5.514 0 10 4.486 10 10h-2c0-4.411-3.589-8-8-8a7.973 7.973 0 0 0-7.957 7.174l-.08.782l-.78.107A6.015 6.015 0 0 0 3 18c0 3.309 2.691 6 6 6h5z"
          />
        </svg>
      </div>
      <h2 className="text-2xl md:text-2xl text-center font-semibold leading-[1.5] mt-5">
        {history.length > 0 ? "Recent shortenings" : "No History"}
      </h2>
      <p className="text-sm text-center mt-3 text-neutral-500">
        Your recent shortenings will appear here.
      </p>

      <div className="max-w-7xl px-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4">
        {history.map((data, index) => (
          <HistoryCard data={data} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

export default History;
