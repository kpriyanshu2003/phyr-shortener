import React from "react";

function Features() {
  return (
    <div id="features" className="mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-16 px-10 md:px-20">
        <div className="flex flex-col items-center text-center">
          <div className="text-lime-300 bg-neutral-800 h-12 w-12 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                d="M13.5 18q.264-.001.5-.085v-.745c0-.647.352-1.13.803-1.414A1.5 1.5 0 1 0 13.5 18m-5.75 5.5h6.886c.26.562.583 1.06.942 1.5H7.75A3.75 3.75 0 0 1 4 21.25v-9.5A3.75 3.75 0 0 1 7.75 8H9V6.5a4.5 4.5 0 1 1 9 0V8h1.25A3.75 3.75 0 0 1 23 11.75v2.739a9 9 0 0 1-1.207-.979a2 2 0 0 0-.293-.228V11.75a2.25 2.25 0 0 0-2.25-2.25H7.75a2.25 2.25 0 0 0-2.25 2.25v9.5a2.25 2.25 0 0 0 2.25 2.25m5.75-20a3 3 0 0 0-3 3V8h6V6.5a3 3 0 0 0-3-3m7.598 10.73c.798.77 2.331 1.992 4.216 2.243c.376.05.686.337.686.696v3.355c0 4.51-4.375 6.147-5.32 6.448a.6.6 0 0 1-.358 0C19.376 26.67 15 25.034 15 20.524v-3.355c0-.359.31-.646.686-.696c1.884-.25 3.418-1.474 4.215-2.243a.894.894 0 0 1 1.197 0"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mt-3">Protected Links</h3>
          <p className="text-sm mt-2  leading-7 lg:leading-7 text-neutral-600">
            Set a password to protect your links from unauthorized access.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-lime-300 bg-neutral-800 h-12 w-12 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mt-3">Custom alias</h3>
          <p className="text-sm mt-2  leading-7 lg:leading-7 text-neutral-600">
            Create a custom alias for your links to make them easy to remember.
          </p>
        </div>
        <div className="flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
          <div className="text-lime-300 bg-neutral-800 h-12 w-12 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22.84 2.998v17.999a2.983 2.983 0 0 1-2.967 2.998a3 3 0 0 1-.368-.02a3.06 3.06 0 0 1-2.61-3.1V3.12A3.06 3.06 0 0 1 19.51.02a2.983 2.983 0 0 1 3.329 2.978zM4.133 18.055a2.973 2.973 0 1 0 0 5.945a2.973 2.973 0 0 0 0-5.945m7.872-9.01h-.05a3.06 3.06 0 0 0-2.892 3.126v7.985c0 2.167.954 3.482 2.35 3.763a2.978 2.978 0 0 0 3.57-2.927v-8.959a2.983 2.983 0 0 0-2.978-2.988"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mt-3">Analytics</h3>
          <p className="text-sm mt-2 leading-7 lg:leading-7 text-neutral-600 max-w-sm">
            Monitor your link performance. Get detailed insights on your links.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
