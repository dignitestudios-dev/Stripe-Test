import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.organizationName) {
    errors.organizationName = "Required";
  }

  if (!values.organizationDomain) {
    errors.organizationDomain = "Required";
  }

  if (!values.organizationSuffix) {
    errors.organizationSuffix = "Required";
  }

  if (!values.organizationLogo) {
    errors.organizationLogo = "Required";
  }

  if (!values.organizationColor1) {
    errors.organizationColor1 = "Required";
  }

  if (!values.organizationColor2) {
    errors.organizationColor2 = "Required";
  }

  if (!values.organizationPrivacyPolicy) {
    errors.organizationPrivacyPolicy = "Required";
  }

  if (!values.organizationTermsOfService) {
    errors.organizationTermsOfService = "Required";
  }

  return errors;
};

const AddOrganizationForm = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("organizationLogo", file);
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    }
  };

  useEffect(() => {
    document.title = "Add Organization";
  }, []);

  const formik = useFormik({
    initialValues: {
      organizationName: "",
      organizationDomain: "",
      organizationSuffix: "",
      organizationLogo: null,
      organizationColor1: "",
      organizationColor2: "",
      organizationPrivacyPolicy: "",
      organizationTermsOfService: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("organizationName", formik.values.organizationName);
      formData.append("organizationDomain", formik.values.organizationDomain);
      formData.append("organizationSuffix", formik.values.organizationSuffix);
      formData.append("organizationColor1", formik.values.organizationColor1);
      formData.append("organizationColor2", formik.values.organizationColor2);
      formData.append(
        "organizationPrivacyPolicy",
        formik.values.organizationPrivacyPolicy
      );
      formData.append(
        "organizationTermsOfService",
        formik.values.organizationTermsOfService
      );
      // Append the logo file to FormData
      if (formik.values.organizationLogo) {
        formData.append("organizationLogo", formik.values.organizationLogo);
      }
      console.log("organization values >>", values);
      try {
        const res = await axios.post(
          `${BASE_URL}/admin/add-organization`,
          formData
        );
        console.log("add organization res >>", res);
        if (res.status === 201) {
          toast.success(res.data.message);
          resetForm();
          navigate("/organizations");
        }
      } catch (error) {
        console.log("add organization error >>", error);
        toast.error("An error occurred while adding organization");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-white p-6 lg:p-10 rounded-xl min-h-screen">
      <h2 className="text-lg font-semibold">Add Organization</h2>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full mt-10 flex flex-col gap-6 lg:w-2/3"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organizationName"
            >
              Organization Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organizationName"
              type="text"
              placeholder="LaunchBox Pakistan"
              name="organizationName"
              onChange={formik.handleChange}
              value={formik.values.organizationName}
            />
            {formik.errors.organizationName ? (
              <div class="red-text text-xs italic">
                {formik.errors.organizationName}
              </div>
            ) : null}
          </div>
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organizationDomain"
            >
              Organization Domain
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organizationDomain"
              type="text"
              placeholder="www.launchbox.pk"
              name="organizationDomain"
              onChange={formik.handleChange}
              value={formik.values.organizationDomain}
            />
            {formik.errors.organizationDomain ? (
              <div class="red-text text-xs italic">
                {formik.errors.organizationDomain}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organizationColor1"
            >
              Organization Color Codes
            </label>
            <div className="w-full grid grid-cols-2 gap-4">
              <div>
                <input
                  class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
                  id="organizationColor1"
                  type="text"
                  placeholder="Color 1"
                  name="organizationColor1"
                  onChange={formik.handleChange}
                  value={formik.values.organizationColor1}
                />
                {formik.errors.organizationColor1 ? (
                  <div class="red-text text-xs italic">
                    {formik.errors.organizationColor1}
                  </div>
                ) : null}
              </div>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
                  id="organizationColor2"
                  type="text"
                  placeholder="Color 2"
                  name="organizationColor2"
                  onChange={formik.handleChange}
                  value={formik.values.organizationColor2}
                />
                {formik.errors.organizationColor2 ? (
                  <div class="red-text text-xs italic">
                    {formik.errors.organizationColor2}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organizationPrivacyPolicy"
            >
              Privacy Policy
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organizationPrivacyPolicy"
              type="text"
              placeholder="LaunchBox"
              name="organizationPrivacyPolicy"
              onChange={formik.handleChange}
              value={formik.values.organizationPrivacyPolicy}
            />
            {formik.errors.organizationPrivacyPolicy ? (
              <div class="red-text text-xs italic">
                {formik.errors.organizationPrivacyPolicy}
              </div>
            ) : null}
          </div>
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organizationTermsOfService"
            >
              Terms Of Service
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organizationTermsOfService"
              type="text"
              placeholder="Color 1"
              name="organizationTermsOfService"
              onChange={formik.handleChange}
              value={formik.values.organizationTermsOfService}
            />
            {formik.errors.organizationTermsOfService ? (
              <div class="red-text text-xs italic">
                {formik.errors.organizationTermsOfService}
              </div>
            ) : null}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full flex flex-col items-start gap-2 5">
            <div className="flex items-center justify-center w-full h-48">
              <label
                htmlFor="organizationLogo"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-24 h-24 mb-4 object-contain rounded"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="organizationLogo"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
            {formik.errors.organizationLogo ? (
              <div class="red-text text-xs italic">
                {formik.errors.organizationLogo}
              </div>
            ) : null}
          </div>
          <div></div>
        </div>

        <div className="w-full flex items-center justify-start gap-3">
          <button
            type="submit"
            className="red-bg px-10 py-3 text-sm font-semibold text-white rounded-lg"
          >
            {loading ? "Adding..." : "Add"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="bg-gray-300 px-10 py-3 text-sm font-semibold text-black rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrganizationForm;
