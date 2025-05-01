import React from "react";
import { Link } from "react-router-dom";

const SimpleFooter = () => {
  return (
    <footer className="w-full pt-10 lg:pt-20 pb-10 padding-x">
      <div className="w-full flex flex-col items-center gap-8">
        <Link to={"/"}>
          {/* <div className="bg-blue-600 w-10 h-10 text-white flex items-center justify-center font-medium text-base rounded-lg">
            AB
          </div> */}
          <img
            src="/logo-main.svg"
            alt="logo"
            className="w-[170px] md:w-[230px]"
          />
        </Link>

        <ul className="flex items-center justify-center gap-x-10">
          <li>
            <a href={`#about`} className="font-medium text-gray-500">
              About
            </a>
          </li>
          <li>
            <a href={`#workflow`} className="font-medium text-gray-500">
              Workflow
            </a>
          </li>
          <li>
            <a href={`#services`} className="font-medium text-gray-500">
              Services
            </a>
          </li>
          <li>
            <a
              href={`#why-we-are-different`}
              className="font-medium text-gray-500"
            >
              Why we
            </a>
          </li>
          <li>
            <a href={`#testimonials`} className="font-medium text-gray-500">
              Testimonials
            </a>
          </li>
        </ul>

        <div className="w-full border opacity-40" />
        <div className="w-full text-center">
          <p className="text-sm text-gray-300">
            Copyright © 2025 Authorized Billing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
