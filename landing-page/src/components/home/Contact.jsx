import React from "react";
import ContactForm from "./ContactForm";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section id="contact" className="w-full padding-x padding-y bg-gray-100">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
        <div className="w-full flex flex-col items-start justify-center gap-5">
          <p className="uppercase text-gray-500 font-medium">
            We're here to help you
          </p>
          <h2 className="section-heading leading-[1.1]">
            Ready for Hassle-Free Bookkeeping?
          </h2>
          <p className="hero-description">
            Stop wasting time on messy books. Let’s get your finances sorted —
            today.
          </p>

          <div className="flex items-start gap-4">
            <MdEmail className="text-3xl text-blue-600" />
            <div className="flex flex-col items-start gap-0">
              <p className="text-gray-500 font-normal text-sm">Email</p>
              <p>
                <Link
                  to={`mailto:info@authorizedbilling.com`}
                  className="text-lg font-medium"
                >
                  info@authorizedbilling.com
                </Link>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <IoMdCall className="text-3xl text-blue-600" />
            <div className="flex flex-col items-start gap-0">
              <p className="text-gray-500 font-normal text-sm">Phone number</p>
              <p>
                <Link to={`tel:8888688385`} className="text-lg font-medium">
                  (888) 868-8385
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
