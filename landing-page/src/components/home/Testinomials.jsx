import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { TESTIMONIALS } from "../../constants/testimonials";

const Testinomials = () => {
  return (
    <section
      id="testimonials"
      className="w-full padding-x padding-y bg-gray-100"
    >
      <div className="w-full py-10">
        <div className="w-full">
          <h2 className="section-heading lg:w-[55%] text-center mx-auto leading-[1]">
            What Our Customers Are Saying
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 lg:mt-14">
          {TESTIMONIALS?.map((t, i) => {
            return (
              <div
                key={i}
                className="w-full bg-white px-10 py-14 flex flex-col items-start gap-4 radius"
              >
                <RiDoubleQuotesL className="text-6xl opacity-40" />
                <p className="lg:text-xl lg:leading-[1.3em]">
                  {t?.testimonial}
                </p>
                <div className="w-full flex items-center gap-2">
                  <img
                    src={t?.image}
                    alt=""
                    className="block rounded-full object-cover w-14 h-14"
                  />
                  <div className="flex flex-col items-start">
                    <p className="font-medium">{t?.author}</p>
                    <p className="text-sm">{t?.designation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testinomials;
