import React from "react";
import { WORKFLOW } from "../../constants/workflow";

const WhoWeWorkWith = () => {
  return (
    <section id="workflow" className="w-full padding-x padding-y">
      <div className="w-full py-10">
        <div className="w-full flex flex-col items-center gap-6">
          <h2 className="section-heading leading-[1.1em] lg:w-[50%] text-center">
            How We Make Bookkeeping Easy
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {WORKFLOW?.map((s, i) => {
              return (
                <div
                  key={i}
                  className="border w-full flex flex-col items-start gap-4 bg-white p-10 radius"
                >
                  <div className="w-14 h-14 border rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-3xl">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold mt-2 text-[1.5rem] leading-[1.2] group-hover:text-white transition-all duration-300">
                    {s?.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-[1.4] group-hover:text-white transition-all duration-300">
                    {s?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
