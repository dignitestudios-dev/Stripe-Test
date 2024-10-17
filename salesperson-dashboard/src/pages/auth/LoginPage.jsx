import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full h-auto lg:h-screen flex items-center justify-center">
      <form className="">
        <h1 className="text-xl font-semibold">Login</h1>

        <div className="w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-full border p-3 text-[15px]"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
