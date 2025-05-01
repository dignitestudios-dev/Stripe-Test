import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full padding-x py-6 lg:pt-20 bg-black text-white">
      <div className="w-full flex justify-between items-center gap-5">
        <Link to={"/"}>
          <div className="bg-blue-600 w-10 h-10 text-white flex items-center justify-center font-medium text-base rounded-lg">
            AB
          </div>
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        <div className="">
          <h3 className="font-medium text-2xl">Services</h3>
          <ul className="flex flex-col items-start gap-3 mt-5">
            {["Bookkeeping", "CFO Services", "Tax", "R&D Credit"]?.map(
              (l, i) => {
                return (
                  <li>
                    <Link to={`/`} key={i} className="text-base">
                      {l}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <div className="">
          <h3 className="font-medium text-2xl">Resources</h3>
          <ul className="flex flex-col items-start gap-3 mt-5">
            {[
              "Resources Library",
              "Blog",
              "Events",
              "Pilot Demo",
              "Ask a Founder",
            ]?.map((l, i) => {
              return (
                <li>
                  <Link to={`/`} key={i} className="text-base">
                    {l}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="">
          <h3 className="font-medium text-2xl">Company</h3>
          <ul className="flex flex-col items-start gap-3 mt-5">
            {["About", "FAQs", "Careers", "Media Kit"]?.map((l, i) => {
              return (
                <li>
                  <Link to={`/`} key={i} className="text-base">
                    {l}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="">
          <h3 className="font-medium text-2xl">Contact</h3>
          <ul className="flex flex-col items-start gap-3 mt-5">
            <li>
              <Link to={"/"}>info@authorizedbilling.com</Link>
            </li>
            <li>
              <Link to={"/"}>0123456789</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full border mt-6 opacity-40" />
      <div className="w-full text-center pt-5">
        <p className="text-sm text-gray-300">
          Copyright © 2025 Authorized Billing. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
