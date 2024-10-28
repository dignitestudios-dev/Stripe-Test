import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { BASE_URL } from "../../api/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  //   if (!values.password) {
  //     errors.password = "Required";
  //   } else if (values.password.length > 20) {
  //     errors.password = "Must be 20 characters or less";
  //   }

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

const UpdateEmployeeForm = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [data, setData] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const fetchUserById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/employees/${_id}`);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrgs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/get-organizations`);
      setOrganizations(res?.data?.data);
    } catch (error) {
      console.log("orgs err >>", error);
    }
  };

  useEffect(() => {
    document.title = "Update Employee";
    fetchUserById();
    fetchOrgs();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      department: data?.department || "",
      organization: data?.organization?._id || "",
      jobPosition: data?.jobPosition || "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          `${BASE_URL}/admin/update-employee/${_id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `${Cookies.get("digniteToken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401 || response.status === 400) {
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

        const data = await response.json();
        toast.success(data.message);
        navigate("/");
        resetForm();
      } catch (error) {
        console.log("Network or server error: ", error);
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full bg-white p-10 rounded-xl min-h-screen">
      <h2 className="text-xl font-semibold text-gray-400 mb-6">
        Update Employee
      </h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Employee Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="name"
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && (
              <div className="red-text text-xs italic">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Employee Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className="red-text text-xs italic">
                {formik.errors.email}
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <div className="red-text text-xs italic">
                {formik.errors.password}
              </div>
            )}
          </div>
        </div> */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="jobPosition"
            >
              Job Position
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="jobPosition"
              type="text"
              name="jobPosition"
              onChange={formik.handleChange}
              value={formik.values.jobPosition}
            />
            {formik.errors.jobPosition && (
              <div className="red-text text-xs italic">
                {formik.errors.jobPosition}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <select
              className="block appearance-none w-full bg-gray-100 border rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="department"
              name="department"
              onChange={formik.handleChange}
              value={formik.values.department}
            >
              <option value="">Select Department</option>
              <option value="Production">Production</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
            </select>
            {formik.errors.department && (
              <div className="red-text text-xs italic">
                {formik.errors.department}
              </div>
            )}
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organization"
            >
              Organization
            </label>
            <select
              className="block appearance-none w-full bg-gray-100 border rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organization"
              name="organization"
              onChange={formik.handleChange}
              value={formik.values.organization}
            >
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.organizationName}
                </option>
              ))}
            </select>
            {formik.errors.organization && (
              <div className="red-text text-xs italic">
                {formik.errors.organization}
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-start gap-3">
          <button
            type="submit"
            className="red-bg px-10 py-2.5 text-sm rounded text-center text-white font-medium"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-gray-400 px-10 text-sm py-2.5 rounded text-center text-white font-medium"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
