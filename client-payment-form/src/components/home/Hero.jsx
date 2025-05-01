import React from "react";
import ContactButton from "./ContactButton";

const Hero = () => {
  return (
    <main className="w-full py-32 lg:py-40 padding-x">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col items-start gap-5 pt-20">
          <h1 className="hero-heading">
            Bookkeeping Done Right, So You Don’t Have To
          </h1>
          <p className="hero-description">
            We handle your books so you can focus on business. Trusted by 500+
            businesses with 99% accuracy and 24/7 support.
          </p>
          <ContactButton title="Get Started Today" />
        </div>
        <div className="flex items-start justify-center px-10">
          <img src="/hero-image.png" alt="" className="w-full object-contain" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
