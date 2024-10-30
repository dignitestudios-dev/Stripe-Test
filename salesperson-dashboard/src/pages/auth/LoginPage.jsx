import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) return "Enter your email.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Enter your password.";
    return "";
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { email, password } = formData;
    try {
      const response = await axios.post(BASE_URL + "/employee/login", {
        email,
        password,
      });

      console.log("employee login res >>", response);
      if (response.status == 200) {
        Cookies.set("dgEmployee", JSON.stringify(response?.data?.data));
        toast.success(response?.data?.message);
        Cookies.set("dgEmployeeToken", response?.data?.token);
        navigate("/");
      }

      if (response.status == 404) {
        toast.error("Email does not exist");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="text-[#333]">
      <div className="max-h-screen flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full min-h-screen">
          <div className="p-6 lg:p-10 shadow-lg w-full flex justify-center items-center h-full">
            <form
              onSubmit={handleSubmit}
              className=" w-[95%] lg:w-[75%] h-full flex flex-col justify-center gap-6"
            >
              <div className="mb-6">
                <h3 className="text-4xl font-normal">Hello,</h3>
                <h3 className="text-5xl font-extrabold">Welcome!</h3>
              </div>
              <div className="w-full">
                <label className="text-sm font-semibold mb-2 block">
                  Email
                </label>
                <div className="relative w-full">
                  <input
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    className="w-full text-sm border border-gray-300 px-4 py-4 rounded outline-none"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-semibold mb-1 block">
                  Password
                </label>
                <div className="relative flex items-center border border-gray-300 pr-4 rounded">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    onChange={handleInputChange}
                    value={formData.password}
                    className="w-full text-sm border-0 px-4 py-4 rounded outline-none"
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
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password}</p>
                )}
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 text-sm font-semibold rounded-md text-white bg-red-500 hover:bg-opacity-85 focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>

          <div className="bg-gray-200 h-full hidden md:block">
            <img
              src="/login-mockup.png"
              alt="login-screen-mockup"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
