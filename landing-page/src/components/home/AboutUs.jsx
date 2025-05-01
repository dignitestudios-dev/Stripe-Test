import React from "react";
import ContactButton from "./ContactButton";

const AboutUs = () => {
  return (
    <section id="about" className="w-full padding-x padding-y bg-gray-100">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10">
        <div className="flex items-center justify-center">
          <img
            src="/about-image.png"
            alt="about-image"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-6 w-full mx-auto">
          <p className="text-base font-semibold bg-blue-100 text-blue-600 px-4 py-3 rounded-full leading-none m-0 p-0">
            About Us
          </p>
          <h2 className="section-heading leading-[1.1]">
            Real People, Reliable Bookkeeping
          </h2>
          <p className="hero-description text-gray-500">
            We’re not just another accounting firm, we're your financial
            partners. With 10+ years in the game, we’ve helped small businesses,
            freelancers, and startups keep their finances clean without the
            stress. No robots, no jargon, just straightforward bookkeeping from
            experts who care.
          </p>
          <ContactButton title={`Contact Us`} />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
