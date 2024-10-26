import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNavigate = () => {
    navigate("/verify-otp");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/admin/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log("verify email res >>", res);
      Cookies.set("verifyEmail", email);
      toast.success("OTP sent you email address");
      handleNavigate();
    } catch (error) {
      console.log("verifyEmail error >> ", error.message);
      setMessage(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.title = "BCT - Verify Email";
  }, []);

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="w-full flex justify-center">
          <div className="rounded-md p-12 w-full lg:w-[55%] xl:w-[35%] shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Verify Email</h3>
                <p className="text-sm mt-4">
                  We'll send an otp to the provided email address.
                </p>
                {/* <p className="text-sm mt-4 text-red-600">{message}</p> */}
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm border border-gray-300 px-4 py-4 rounded-md outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="!mt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full shadow-xl py-3.5 px-4 text-sm font-semibold rounded-md text-white bg-red-500 hover:opacity-85 focus:outline-none"
                >
                  Send OTP
                </button>
              </div>

              <div className="w-full flex justify-center mt-2">
                <Link to="/login" className="text-sm text-gray-500 underline">
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
