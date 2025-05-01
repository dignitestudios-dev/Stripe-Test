"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FAQS } from "../../constants/faqs";

const Faqs = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  return (
    <section
      className="w-full py-10 lg:pt-20 lg:pb-32 padding-x flex flex-col items-center"
      id="faqs"
    >
      <h2 className="section-heading text-center">
        Frequently Asked Questions
      </h2>

      <section className="w-full mt-10 lg:mt-14 flex flex-col items-start gap-4 lg:w-[70%]">
        {FAQS?.map((faq, index) => (
          <div
            className={`w-full radius px-5 py-5 bg-[#F9F9F9] text-black`}
            key={index}
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full text-start flex items-start justify-between outline-none"
            >
              <h5 className="font-semibold text-[17px] md:text-2xl lg:text-[25px] w-[90%]">
                <span className="w-full leading-7 lg:leading-10">
                  {faq?.question}
                </span>
              </h5>
              <IoIosArrowDown
                className={`text-2xl ${
                  openFaq === index ? "rotate-180" : "rotate-0"
                } transition-all duration-500`}
              />
            </button>

            <motion.div
              initial={false}
              animate={{
                height: openFaq === index ? "auto" : 0,
                opacity: openFaq === index ? 1 : 0,
                marginTop: openFaq === index ? "18px" : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-base lg:text-[20px] font-normal lg:w-[90%] text-gray-500">
                {faq?.answer}
              </p>
            </motion.div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Faqs;
