import React, { useEffect, useState } from "react";
// import customerServices from "../../services/customerServices";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import paymentLinkServices from "../../services/paymentLinkServices";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { Link } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.projectTitle) {
    errors.projectTitle = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.organizationSuffix) {
    errors.organizationSuffix = "Required";
  }

  if (!values.organization) {
    errors.organization = "Required";
  }

  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount == 0) {
    errors.amount = "Amount can not be 0";
  } else if (values.amount < 0) {
    errors.amount = "Amount can not be less than 0";
  }

  // if (!values.descriptorSuffix) {
  //   errors.descriptorSuffix = "Required";
  // } else if (values.descriptorSuffix < 5) {
  //   errors.descriptorSuffix = "Must be grater than 5 characters.";
  // } else if (values.descriptorSuffix > 12) {
  //   errors.descriptorSuffix = "Cannot be grater than 12 characters.";
  // }

  return errors;
};

const CreatePaymentLinkForm = () => {
  const loggedInUser = Cookies.get("digniteAdminId");
  //   console.log(loggedInUser);
  const [organizations, setOrganizations] = useState([]);
  //   console.log("organizations >>", organizations);

  const fetchOrgs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/get-organizations`);
      console.log("orgs >>", res);
      setOrganizations(res?.data?.data);
    } catch (error) {
      console.log("orgs err >>", error);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      projectTitle: "",
      description: "",
      amount: "",
      salesPerson: loggedInUser || "",
      organizationSuffix: "",
      organization: "",
      // salesPersonDepartment: loggedInUser?.department || "",
      // descriptorSuffix: loggedInUser?.organization?.organizationSuffix || "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const res = await paymentLinkServices.handleCreateCustomer(values);
        console.log(res);
        toast.success("Payment link created");
        // resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Payment link could not be created.");
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-1/2 lg:w-2/3 p-10 flex flex-col gap-5 bg-white"
      >
        <h2 className="text-lg font-semibold">Create Payment Link</h2>

        <h2 className="text-lg font-semibold mt-5">Client Info:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="">
            <label htmlFor="name" className="text-sm font-medium">
              Client Name
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
            />
            {formik.errors.name ? (
              <div className="text-xs text-red-600">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="">
            <label htmlFor="email" className="text-sm font-medium">
              Client Email
            </label>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
            />
            {formik.errors.email ? (
              <div className="text-xs text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-5">Product Info:</h2>
        <div className="">
          <label htmlFor="projectTitle" className="text-sm font-medium">
            Product Title
          </label>
          <input
            type="text"
            name="projectTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.projectTitle}
            className="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
          />
          {formik.errors.projectTitle ? (
            <div className="text-xs text-red-600">
              {formik.errors.projectTitle}
            </div>
          ) : null}
        </div>
        <div className="">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
            id="description"
            rows={4}
          ></textarea>
          {formik.errors.description ? (
            <div className="text-xs text-red-600">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
            className="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
          />
          {formik.errors.amount ? (
            <div className="text-xs text-red-600">{formik.errors.amount}</div>
          ) : null}
        </div>
        {/* Organization */}
        <div class="w-full mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="organizatoin"
          >
            Organization
          </label>
          <div class="relative w-full">
            <select
              class="block appearance-none w-full bg-gray-100 text-sm border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organizatoin"
              name="organization"
              onChange={formik.handleChange}
              value={formik.values.organization}
            >
              <option selected>Choose an organization</option>
              {organizations?.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.organizationName}
                </option>
              ))}
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
            <div class="red-text text-xs italic">
              {formik.errors.organization}
            </div>
          ) : null}
        </div>
        {/* Organization details */}

        {/* Organization Suffix */}
        <div class="w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="organizationSuffix"
          >
            Suffix
          </label>
          <input
            class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
            id="organizationSuffix"
            type="text"
            placeholder="LaunchBox"
            name="organizationSuffix"
            onChange={formik.handleChange}
            value={formik.values.organizationSuffix}
          />
          {formik.errors.organizationSuffix ? (
            <div class="red-text text-xs italic">
              {formik.errors.organizationSuffix}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="red-bg px-8 py-2.5 rounded text-center text-white font-medium text-sm"
          >
            Create Link
          </button>
          <Link
            to="/payment-links"
            className="bg-gray-400 px-8 py-2.5 rounded text-center text-white font-medium text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreatePaymentLinkForm;
