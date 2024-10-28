import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BASE_URL } from "../../api/api";

const VerifyOtpForm = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/reset-password");
  };

  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);

  useEffect(() => {
    document.title = "Verify OTP";
    if (!isTimerActive) return;

    if (timeLeft <= 0) {
      setIsTimerActive(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive]);

  const resendOtp = async () => {
    const email = Cookies.get("verifyEmail");
    try {
      //   const response = await AuthServices2.resendOtp(email);
      //   return response.data; // Make sure you handle and return data properly
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error resending OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("verifyEmail");
    try {
      const res = await fetch(`${BASE_URL}/admin/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });
      console.log("verify email res >>", res);
      Cookies.set("verifyEmail", email);
      toast.success("OTP verified");
      navigate("/change-password");
      // handleNavigate();
    } catch (error) {
      console.log("verifyEmail error >> ", error.message);
      setMessage(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="w-full flex justify-center">
          <div className="rounded-md p-12 w-full lg:w-[55%] xl:w-[35%] shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Verify OTP</h3>
                <p className="text-sm mt-4">
                  Input the OTP code we've provided at your registered email.
                </p>
                <p className="text-sm mt-4 red-text">{message}</p>
              </div>
              <div>
                <label className="text-sm mb-2 block">OTP Code</label>
                <div className="relative flex items-center">
                  <input
                    name="code"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    required
                    className="w-full text-sm border border-gray-300 px-4 py-4 rounded-md outline-none"
                    placeholder="OTP Code"
                  />
                </div>
              </div>

              <div className="!mt-4">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3.5 px-4 text-sm font-semibold rounded-md text-white red-bg hover:opacity-85 focus:outline-none"
                >
                  Verify OTP
                </button>
              </div>

              {isTimerActive && !state ? (
                <div className="w-full flex items-center justify-center gap-2">
                  <p className="text-gray-400">Resend</p>{" "}
                  <span className="font-medium">{timeLeft}s</span>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center gap-2">
                  <p className="text-gray-400">Didn't receive code?</p>{" "}
                  <button
                    onClick={() => resendOtp()}
                    type="button"
                    className="font-medium"
                  >
                    Resend
                  </button>
                </div>
              )}
              {state && (
                <div className="w-full flex items-center justify-center">
                  <p className="text-sm">
                    OTP has been verified{" "}
                    <Link
                      to={"/reset-password"}
                      className="text-blue-600 underline"
                    >
                      Change Password
                    </Link>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
