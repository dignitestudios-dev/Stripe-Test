import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { SERVICES } from "../../constants/services";

const WhatWeDo = () => {
  return (
    <section id="services" className="w-full padding-x padding-y bg-gray-100">
      <div className="">
        <span className="text-base font-semibold bg-blue-100 text-blue-600 px-4 py-3 rounded-full leading-none m-0 p-0">
          What We Do?
        </span>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
        <div className="flex flex-col items-start justify-start">
          <h2 className="section-heading leading-[1.1]">
            Bookkeeping That Works for You
          </h2>
        </div>
        <div className="flex flex-col items-start gap-6 w-full mx-auto">
          <p className="hero-description text-gray-500">
            Real people manage your books, fix errors, and keep everything
            organized so you always know where you stand.
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-10">
        {SERVICES?.map((s, i) => {
          return (
            <div
              key={i}
              className="w-full flex flex-col items-start gap-4 bg-white p-10 radius"
            >
              <img
                src={s?.icon}
                alt={s?.title}
                className="text-gray-500 opacity-70"
                width={48}
              />
              <h3 className="font-semibold mt-2 text-[1.3rem] group-hover:text-white transition-all duration-300">
                {s?.title}
              </h3>
              <p className="text-gray-500 text-base leading-[1.4] group-hover:text-white transition-all duration-300">
                {s?.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatWeDo;
