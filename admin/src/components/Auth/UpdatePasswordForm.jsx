import React, { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
// import { ResetPasswordMockup } from "../assets/export";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BASE_URL } from "../../api/api";

const UpdatePasswordForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Cookies.get("verifyEmail");
    console.log("email >>", email);
    try {
      const res = await fetch(`${BASE_URL}/admin/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      // handle success
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error) {
      console.log("verifyEmail error >> ", error.message);
      // setMessage(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.title = "Change Password";
  }, []);

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="w-full flex justify-center">
          <div className="rounded-md p-12 w-full lg:w-[55%] xl:w-[35%] shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold">Update Password.</h3>
                <p className="text-sm mt-4">Update your password!</p>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center border justify-start border-gray-300 rounded-md px-4">
                  <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPass ? "text" : "password"}
                    className="w-full text-sm py-4 outline-none"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <LuEye className="text-lg text-gray-400" />
                    ) : (
                      <LuEyeOff className="text-lg text-gray-400" />
                    )}
                  </button>
                </div>
                {password !== "" && <p className="text-sm red-text">{error}</p>}
              </div>
              <div>
                <label className="text-sm mb-2 block">Confirm Password</label>
                <div className="relative flex items-center border justify-start border-gray-300 rounded-md px-4">
                  <input
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showPass2 ? "text" : "password"}
                    className="w-full text-sm py-4 outline-none"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass2(!showPass2)}
                  >
                    {showPass2 ? (
                      <LuEye className="text-lg text-gray-400" />
                    ) : (
                      <LuEyeOff className="text-lg text-gray-400" />
                    )}
                  </button>
                </div>
                {password !== "" && <p className="text-sm red-text">{error}</p>}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3.5 px-4 text-sm font-semibold rounded-md text-white red-bg hover:opacity-85 focus:outline-none"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
