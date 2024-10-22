import React, { useState } from "react";
import customerServices from "../../services/customerServices";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.projectTitle) {
    errors.projectTitle = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.salesPersonName) {
    errors.salesPersonName = "Required";
  }

  if (!values.salesPersonDepartment) {
    errors.salesPersonDepartment = "Required";
  }

  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount <= 0) {
    errors.amount = "Amount can not be 0";
  }

  if (!values.descriptorSuffix) {
    errors.descriptorSuffix = "Required";
  } else if (values.descriptorSuffix < 5) {
    errors.descriptorSuffix = "Must be grater than 5 characters.";
  } else if (values.descriptorSuffix > 12) {
    errors.descriptorSuffix = "Cannot be grater than 12 characters.";
  }

  return errors;
};

const CreateCustomerForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
      amount: "",
      salesPersonName: "",
      salesPersonDepartment: "",
      projectTitle: "",
      descriptorSuffix: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const resolveAfter3Sec = new Promise(async (resolve, reject) => {
        try {
          const res = await customerServices.handleCreateCustomer(values);
          console.log("res >> ", res);
          // alert(res?.message);
          resetForm();
          resolve("Form submitted");
        } catch (error) {
          console.log("err >> ", error);
          alert("Something went wrong");
          reject("Something went wrong");
        }
      });
      toast.promise(resolveAfter3Sec, {
        pending: "Promise is pending",
        success: "Promise resolved 👌",
        error: "Promise rejected 🤯",
      });
    },
  });

  return (
    <div className="padding-x flex justify-center items-center min-h-screen py-12 bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-1/2 lg:w-2/3 p-10 flex flex-col gap-5 bg-white"
      >
        <h1 className="font-semibold text-2xl text-center">Create Link</h1>
        <h2 className="text-xl font-semibold mt-5">Client Info:</h2>
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
              className="border  p-3 text-sm outline-none w-full"
            />
            {formik.errors.name ? (
              <div className="text-xs text-red-500">{formik.errors.name}</div>
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
              className="border  p-3 text-sm outline-none w-full"
            />
            {formik.errors.email ? (
              <div className="text-xs text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
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
            className="border  p-3 text-sm outline-none w-full"
          />
          {formik.errors.amount ? (
            <div className="text-xs text-red-500">{formik.errors.amount}</div>
          ) : null}
        </div>
        <h2 className="text-xl font-semibold mt-5">Project Info:</h2>
        <div className="">
          <label htmlFor="projectTitle" className="text-sm font-medium">
            Project Title
          </label>
          <input
            type="text"
            name="projectTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.projectTitle}
            className="border  p-3 text-sm outline-none w-full"
          />
          {formik.errors.projectTitle ? (
            <div className="text-xs text-red-500">
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
            className="border  p-3 text-sm outline-none w-full"
            id="description"
            rows={4}
          ></textarea>
          {formik.errors.description ? (
            <div className="text-xs text-red-500">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="">
          <label htmlFor="descriptorSuffix" className="text-sm font-medium">
            Descriptor Suffix
          </label>
          <input
            type="text"
            name="descriptorSuffix"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.descriptorSuffix}
            className="border  p-3 text-sm outline-none w-full"
          />
          {formik.errors.descriptorSuffix ? (
            <div className="text-xs text-red-500">
              {formik.errors.descriptorSuffix}
            </div>
          ) : null}
        </div>
        <h2 className="text-xl font-semibold mt-5">Salesperson Info:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="">
            <label htmlFor="salesPersonName" className="text-sm font-medium">
              Salesperson Name
            </label>
            <input
              type="text"
              name="salesPersonName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salesPersonName}
              className="border  p-3 text-sm outline-none w-full"
            />
            {formik.errors.salesPersonName ? (
              <div className="text-xs text-red-500">
                {formik.errors.salesPersonName}
              </div>
            ) : null}
          </div>
          <div className="">
            <label
              htmlFor="salesPersonDepartment"
              className="text-sm font-medium"
            >
              Salesperson Department
            </label>
            <input
              type="text"
              name="salesPersonDepartment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salesPersonDepartment}
              className="border  p-3 text-sm outline-none w-full"
            />
            {formik.errors.salesPersonDepartment ? (
              <div className="text-xs text-red-500">
                {formik.errors.salesPersonDepartment}
              </div>
            ) : null}
          </div>
        </div>

        <div className="">
          <button
            type="submit"
            className="bg-red-500 text-white py-3  text-sm font-medium w-full"
          >
            Create Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerForm;