/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#090909] py-20 md:px-24 px-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-16">
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <img src="/logoLight.svg" className="h-16" alt="" />
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
            Rasoi is a digital menu software that helps restaurants to digitize
            their menu and provide a better experience to their customers.
          </p>
          <p className="text-xs mt-3 text-neutral-300 leading-6">
            hello@phyr.global
          </p>
        </div>

        <div className="lg:pl-16">
          <h2 className="text-lg font-semibold text-neutral-300">Sitemap</h2>
          <div className="space-y-2">
            <p className="text-xs mt-3 text-neutral-400 leading-6">Home</p>
            <p className="text-xs mt-3 text-neutral-400 leading-6">Features</p>
            <p className="text-xs mt-3 text-neutral-400 leading-6">
              Testimonials
            </p>
            <p className="text-xs mt-3 text-neutral-400 leading-6">Contact</p>
          </div>
        </div>
        <div className="lg:pl-16">
          <h2 className="text-lg font-semibold text-neutral-300">Socials</h2>
          <div className="space-y-2">
            <p className="text-xs mt-3 text-neutral-400 leading-6">Instagram</p>
            <p className="text-xs mt-3 text-neutral-400 leading-6">Twitter</p>
            <p className="text-xs mt-3 text-neutral-400 leading-6">Facebook</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
