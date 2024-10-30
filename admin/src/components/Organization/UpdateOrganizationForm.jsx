import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

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

  if (!values.color1) {
    errors.color1 = "Required";
  }

  if (!values.color2) {
    errors.color2 = "Required";
  }

  if (!values.organizationPrivacyPolicy) {
    errors.organizationPrivacyPolicy = "Required";
  }

  if (!values.organizationTermsOfService) {
    errors.organizationTermsOfService = "Required";
  }

  if (!values.organizationPhoneNumber) {
    errors.organizationPhoneNumber = "Required";
  }

  if (!values.organizationSupportEmail) {
    errors.organizationSupportEmail = "Required";
  }

  if (!values.organizationAddress) {
    errors.organizationAddress = "Required";
  }

  return errors;
};

const UpdateOrganizationForm = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { _id } = useParams();

  const fetchOrganizationById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/organization/${_id}`);
      setData(res?.data);
      // console.log(res.data);
      // Update form fields with fetched data
      formik.setValues({
        organizationName: res.data.organizationName || "",
        organizationDomain: res.data.organizationDomain || "",
        organizationSuffix: res.data.organizationSuffix || "",
        organizationLogo: `${res.data.organizationLogo}`,
        color1: res.data.organizationColors?.color1 || "",
        color2: res.data.organizationColors?.color2 || "",
        organizationPrivacyPolicy: res.data.organizationPrivacyPolicy || "",
        organizationTermsOfService: res.data.organizationTermsOfService || "",
        organizationPhoneNumber: res.data.organizationPhoneNumber || "",
        organizationSupportEmail: res.data.organizationSupportEmail || "",
        organizationAddress: res.data.organizationAddress || "",
      });
    } catch (error) {
      console.log("Error while fetching organization data:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("organizationLogo", file);
      const fileURL = URL.createObjectURL(file);
      console.log("fileUrl >>", fileURL);
      setPreview(fileURL);
    }
  };

  useEffect(() => {
    document.title = "Update Organization";
    fetchOrganizationById();
  }, []);

  const formik = useFormik({
    initialValues: {
      organizationName: "",
      organizationDomain: "",
      organizationSuffix: "",
      organizationLogo: null,
      color1: "",
      color2: "",
      organizationPrivacyPolicy: "",
      organizationTermsOfService: "",
      organizationPhoneNumber: "",
      organizationSupportEmail: "",
      organizationAddress: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const formData = new FormData();

      formData.append("organizationName", values.organizationName);
      formData.append("organizationDomain", values.organizationDomain);
      formData.append("organizationSuffix", values.organizationSuffix);

      // Handle nested organization colors
      formData.append("organizationColors[color1]", values.color1);
      formData.append("organizationColors[color2]", values.color2);

      formData.append(
        "organizationSupportEmail",
        values.organizationSupportEmail
      );
      formData.append("organizationAddress", values.organizationAddress);
      formData.append(
        "organizationPhoneNumber",
        values.organizationPhoneNumber
      );
      formData.append(
        "organizationPrivacyPolicy",
        values.organizationPrivacyPolicy
      );
      formData.append(
        "organizationTermsOfService",
        values.organizationTermsOfService
      );

      // Add file if it exists
      if (values.organizationLogo) {
        formData.append("organizationLogo", values.organizationLogo);
      }

      try {
        const res = await axios.put(
          `${BASE_URL}/admin/update-organization/${_id}`,
          formData
        );
        if (res.status === 200) {
          toast.success("Organization updated successfully!");
          navigate("/organizations");
        }
      } catch (error) {
        console.error("Error updating organization:", error);
        toast.error("An error occurred while updating the organization.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-white p-6 lg:p-10 rounded-xl min-h-screen">
      <h2 className="text-lg font-semibold">Update Organization</h2>

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
              htmlFor="color1"
            >
              Organization Color Codes
            </label>
            <div className="w-full grid grid-cols-2 gap-4">
              <div>
                <input
                  class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
                  id="color1"
                  type="text"
                  placeholder="Color 1"
                  name="color1"
                  onChange={formik.handleChange}
                  value={formik.values.color1}
                />
                {formik.errors.color1 ? (
                  <div class="red-text text-xs italic">
                    {formik.errors.color1}
                  </div>
                ) : null}
              </div>
              <div>
                <input
                  class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
                  id="color2"
                  type="text"
                  placeholder="Color 2"
                  name="color2"
                  onChange={formik.handleChange}
                  value={formik.values.color2}
                />
                {formik.errors.color2 ? (
                  <div class="red-text text-xs italic">
                    {formik.errors.color2}
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
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organizationPhoneNumber"
            >
              Phone No.
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organizationPhoneNumber"
              type="text"
              placeholder="LaunchBox"
              name="organizationPhoneNumber"
              onChange={formik.handleChange}
              value={formik.values.organizationPhoneNumber}
            />
            {formik.errors.organizationPhoneNumber ? (
              <div class="red-text text-xs italic">
                {formik.errors.organizationPhoneNumber}
              </div>
            ) : null}
          </div>
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="organizationSupportEmail"
            >
              Support Email
            </label>
            <input
              class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
              id="organizationSupportEmail"
              type="text"
              placeholder="Color 1"
              name="organizationSupportEmail"
              onChange={formik.handleChange}
              value={formik.values.organizationSupportEmail}
            />
            {formik.errors.organizationSupportEmail ? (
              <div class="red-text text-xs italic">
                {formik.errors.organizationSupportEmail}
              </div>
            ) : null}
          </div>
        </div>
        <div class="w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="organizationTermsOfService"
          >
            Organization address
          </label>
          <input
            class="appearance-none block w-full bg-gray-100 text-gray-700 text-sm border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#B2162D]"
            id="organizationAddress"
            type="text"
            placeholder="Color 1"
            name="organizationAddress"
            onChange={formik.handleChange}
            value={formik.values.organizationAddress}
          />
          {formik.errors.organizationAddress ? (
            <div class="red-text text-xs italic">
              {formik.errors.organizationAddress}
            </div>
          ) : null}
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
                      alt="Organization Logo Preview"
                      className="w-20 h-20 rounded-full"
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
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="bg-gray-300 px-10 py-3 text-sm font-semibold text-black rounded-lg"
            onClick={() => navigate("/organizations")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrganizationForm;
