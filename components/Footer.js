/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#090909] py-20 md:px-24 px-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-16 max-w-7xl mx-auto">
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <h2 className="font-semibold text-3xl text-white">Shortener.</h2>
          <Link href="https://phyr.global">
            <img
              src="https://phyr.global/product-of-phyr.svg"
              className="h-12 md:h-10 mt-7"
              alt=""
            />
          </Link>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-lg font-semibold text-neutral-300">About</h2>
          <p className="text-xs mt-3 text-neutral-400 leading-6">
            Shorten your long URLs, share them with your friends, and analyze
            them for free.
          </p>
          <p className="text-xs mt-3 text-neutral-300 leading-6">
            hello@phyr.global
          </p>
        </div>

        <div className="lg:pl-16">
          <h2 className="text-lg font-semibold text-neutral-300">Sitemap</h2>
          <ul className="space-y-2">
            <li className="text-xs mt-3 text-neutral-400 leading-6">
              <Link href="/">Home</Link>
            </li>
            <li className="text-xs mt-3 text-neutral-400 leading-6">
              <Link href="/#features">Features</Link>
            </li>
            <li className="text-xs mt-3 text-neutral-400 leading-6">
              <Link href="https://phyr.global/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="lg:pl-16">
          <h2 className="text-lg font-semibold text-neutral-300">Socials</h2>
          <ul className="space-y-2">
            <li className="text-xs mt-3 text-neutral-400 leading-6">
              <Link
                href={
                  "https://www.instagram.com/phyr.studios?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
              >
                Instagram
              </Link>
            </li>
            <li className="text-xs mt-3 text-neutral-400 leading-6">
              <Link href="https://www.linkedin.com/company/phyr">LinkedIn</Link>
            </li>
            <li className="text-xs mt-3 text-neutral-400 leading-6">
              <Link href="https://www.facebook.com/phyr.global">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
