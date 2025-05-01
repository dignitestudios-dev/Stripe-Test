import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="w-full padding-x py-10">
      <div className="w-full bg-blue-600 text-white rounded-[40px] px-10 py-16 flex flex-col items-center justify-between gap-2">
        <h2 className="section-heading font-semibold leading-[1em] text-center">
          Ready for Hassle-Free Bookkeeping?
        </h2>
        <p className="text-lg mt-4 lg:w-1/2 text-center">
          Stop wasting time on messy books. Let’s get your finances
          sorted—today.
        </p>
        <Link
          to={`/`}
          className="font-semibold bg-white rounded-full px-6 py-4 text-blue-600 mt-5"
        >
          Start Now, Talk to an Expert
        </Link>
      </div>
    </section>
  );
};

export default CTA;
