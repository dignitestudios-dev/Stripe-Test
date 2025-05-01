import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  console.log("scrolled >>", scrolled);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 150;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full py-5 padding-x fixed top-0 inset-x-0 z-50 bg-white ${
        scrolled ? "custom-shadow" : ""
      }`}
    >
      <nav className="w-full flex items-center justify-between">
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
        <ul className="hidden lg:flex items-center justify-center gap-x-10">
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
          {/* <li className="relative group">
            <button
              type="button"
              className="flex items-center gap-1.5 font-medium group text-gray-500 group relative"
            >
              Services{" "}
              <IoIosArrowDown className="group-hover:rotate-180 transition-all duration-500" />
            </button>
            <div className="w-[250px] min-h-[200px] bg-transparent z-50 absolute top-5 hidden group-hover:block transition-all duration-300">
              <div className="flex flex-col items-start p-4 mt-3 relative bg-white custom-shadow">
                {[
                  "Accounting Outsourcing",
                  "Account Payable",
                  "Accounts Receivable",
                  "Financial Reporting",
                  "Payroll Outsourcing",
                  "Bidgeting and Forecasting",
                  "KPI Reporting",
                  "Project Accounting",
                ]?.map((l, i) => {
                  return (
                    <Link to={"/"} key={i} className="font-medium block my-1">
                      {l}
                    </Link>
                  );
                })}
              </div>
            </div>
          </li> */}
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

        <div className="flex items-center gap-4 justify-end">
          <a
            href={`#contact`}
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hidden lg:block"
          >
            Contact Sales
          </a>

          <button
            type="button"
            onClick={() => toggleSidebar()}
            className="block lg:hidden"
          >
            <LuMenu className="text-2xl" />
          </button>
        </div>

        <div
          className={`w-full lg:hidden absolute h-screen bg-transparent inset-0 z-50 ${
            openSidebar ? "-translate-x-0" : "translate-x-full"
          } transition-all duration-700`}
        >
          <div className="w-[60%] md:w-[40%] h-full float-end shadow-lg p-5 relative bg-white">
            <button type="button" onClick={() => toggleSidebar()}>
              <IoClose className="text-3xl md:text-xl" />
            </button>

            <ul className="flex  flex-col items-start justify-start gap-4 mt-10">
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
