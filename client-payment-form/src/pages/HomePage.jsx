import React from "react";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import "../components/home/styles.css";
import AboutUs from "../components/home/AboutUs";
import WhoWeWorkWith from "../components/home/WhoWeWorkWith";
import WhatWeDo from "../components/home/WhatWeDo";
import WhyWeAreDifferent from "../components/home/WhyWeAreDifferent";
import Testinomials from "../components/home/Testinomials";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";
import Faqs from "../components/home/Faqs";
import Contact from "../components/home/Contact";
import SimpleFooter from "../components/home/SimpleFooter";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <WhoWeWorkWith />
      <WhatWeDo />
      <WhyWeAreDifferent />
      <Testinomials />
      <Faqs />
      {/* <CTA /> */}
      <Contact />
      {/* <Footer /> */}
      <SimpleFooter />
    </>
  );
};

export default HomePage;
