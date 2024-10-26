import React, { useState } from "react";
import { useFormik } from "formik";
import { BASE_URL } from "../../api/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.organization) {
    errors.organization = "Required";
  }

  if (!values.department) {
    errors.department = "Required";
  }

  if (!values.jobPosition) {
    errors.jobPosition = "Required";
  }
  return errors;
};

const CreateEmployeeForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      department: "",
      organization: "",
      jobPosition: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${BASE_URL}/admin/create-employee`, {
          method: "POST",
          headers: {
            Authorization: `${Cookies.get("digniteToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401 || response.status === 400) {
            console.log("Token error: ", errorData.message);

            Cookies.remove("digniteToken");
            Cookies.remove("digniteAdminEmail");
            Cookies.remove("digniteAdminName");
            Cookies.remove("digniteAdminId");

            toast.error("Session expired. Please log in again.");
            navigate("/login");
          } else {
            toast.error(`Error: ${errorData.message}`);
          }
          return;
        }

        // Success case
        const data = await response.json();
        console.log("Employee created:", data);
        toast.success(data.message);
        resetForm(); // Reset the form after successful submission
      } catch (error) {
        console.log("Network or server error: ", error);
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="w-full bg-white p-10 ronuded-xl min-h-screen">
      <h2 className="text-xl font-semibold text-gray-400 mb-6">Add New User</h2>
      <form onSubmit={formik.handleSubmit} class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="name"
            >
              Employee Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Jane"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <div class="text-red-500 text-xs italic">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="email"
            >
              Emplpoyee Email
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="text"
              name="email"
              placeholder="Doe"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div class="text-red-500 text-xs italic">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              //   name="password"
              placeholder="******************"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div class="text-red-500 text-xs italic">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="jobPosition"
            >
              Job Position
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="jobPosition"
              type="jobPosition"
              name="jobPosition"
              placeholder=""
              onChange={formik.handleChange}
              value={formik.values.jobPosition}
            />
            {formik.errors.jobPosition ? (
              <div class="text-red-500 text-xs italic">
                {formik.errors.jobPosition}
              </div>
            ) : null}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div class="flex flex-wrap -mx-3 mb-2"> */}
          <div class="w-full mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="department"
            >
              Department
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="department"
                name="department"
                onChange={formik.handleChange}
                value={formik.values.department}
              >
                <option selected value={"Production"}>
                  Production
                </option>
                <option value={"HR"}>HR</option>
                <option value={"Sales"}>Sales</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {formik.errors.department ? (
              <div class="text-red-500 text-xs italic">
                {formik.errors.department}
              </div>
            ) : null}
          </div>
          <div class="w-full mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="organizatoin"
            >
              Organization
            </label>
            <div class="relative w-full">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="organizatoin"
                name="organization"
                onChange={formik.handleChange}
                value={formik.values.organization}
              >
                <option selected value={"DS"}>
                  DS
                </option>
                <option value={"CTS"}>CTS</option>
                <option value={"LB"}>LB</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {formik.errors.organization ? (
              <div class="text-red-500 text-xs italic">
                {formik.errors.organization}
              </div>
            ) : null}
          </div>
          {/* </div> */}
        </div>

        <div className="mt-8 flex items-center justify-start gap-3">
          <button
            type="submit"
            className="bg-red-500 px-10 py-2.5 rounded text-center text-white font-medium"
          >
            Add
          </button>
          <button
            type="button"
            className="bg-gray-400 px-10 py-2.5 rounded text-center text-white font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
