"use client";

import { verifyPassword } from "@/prisma/link";
import { EyeClosed, EyeOpen, IconRight } from "@/static/icons";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function PasswordForm({ pid }) {
  const router = useRouter();
  const [isPassVisible, setIsPassVisible] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    if (password.length == 0) {
      toast.error("Password cannot be empty");
    }
    e.preventDefault();
    setLoading(true);
    verifyPassword(pid, password)
      .then((res) => {
        if (res.success) {
          setLoading(false);
          router.push(res.url);
        } else {
          toast.error(res.error);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);
        alert("An error occurred. Please try again later.");
      });
  };
  return (
    <div className="h-[calc(80vh)]">
      <div className="max-w-xl mx-auto pt-20">
        <div className="flex mx-auto items-center rounded-full bg-lime-300 justify-center text-neutral-900 h-16 w-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 28 28"
          >
            <path
              fill="currentColor"
              d="M13.5 18q.264-.001.5-.085v-.745c0-.647.352-1.13.803-1.414A1.5 1.5 0 1 0 13.5 18m-5.75 5.5h6.886c.26.562.583 1.06.942 1.5H7.75A3.75 3.75 0 0 1 4 21.25v-9.5A3.75 3.75 0 0 1 7.75 8H9V6.5a4.5 4.5 0 1 1 9 0V8h1.25A3.75 3.75 0 0 1 23 11.75v2.739a9 9 0 0 1-1.207-.979a2 2 0 0 0-.293-.228V11.75a2.25 2.25 0 0 0-2.25-2.25H7.75a2.25 2.25 0 0 0-2.25 2.25v9.5a2.25 2.25 0 0 0 2.25 2.25m5.75-20a3 3 0 0 0-3 3V8h6V6.5a3 3 0 0 0-3-3m7.598 10.73c.798.77 2.331 1.992 4.216 2.243c.376.05.686.337.686.696v3.355c0 4.51-4.375 6.147-5.32 6.448a.6.6 0 0 1-.358 0C19.376 26.67 15 25.034 15 20.524v-3.355c0-.359.31-.646.686-.696c1.884-.25 3.418-1.474 4.215-2.243a.894.894 0 0 1 1.197 0"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-center mt-8">
          Protected document 😅
        </h1>
        <p className="text-center mt-4 leading-8 text-neutral-500">
          The link you are trying to access is protected by a password. Please
          enter the password to continue.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex items-center mx-auto justify-center mt-12 border-b w-fit pb-3 focus-within:border-neutral-300 transition-all"
          action=""
        >
          <button
            type="button"
            onClick={() => setIsPassVisible(!isPassVisible)}
            className="ml-3 text-neutral-800"
          >
            {isPassVisible ? <EyeOpen /> : <EyeClosed />}
          </button>
          <input
            className="h-14 px-5 bg-transparent outline-none"
            placeholder="・・・・・・・"
            type={isPassVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <Button
            className="h-12 w-12 rounded-lg bg-neutral-200 flex items-center justify-center"
            isIconOnly
            isLoading={loading}
            isDisabled={loading}
            type="submit"
          >
            <IconRight />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PasswordForm;
