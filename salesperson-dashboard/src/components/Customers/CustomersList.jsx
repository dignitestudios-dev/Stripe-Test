import React, { useEffect, useState } from "react";
import customerServices from "../../services/customerServices";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const myInfo = JSON.parse(Cookies.get("dgEmployee"));

  const fetchCustomers = async () => {
    try {
      const resp = await customerServices.handleFetchCustomers(myInfo?._id);
      // console.log("res >> ", resp.data);
      setCustomers(resp.data);
    } catch (error) {
      console.log("err >> ", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDeletePaymentFormUrl = async (priceId) => {
    try {
      console.log(priceId);
      const res = await customerServices.handleDeleteFormUrl(priceId);
      console.log("deleted res >> ", res);
      toast.success("Product deleted successfully");

      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.priceId !== priceId)
      );
    } catch (error) {
      console.log("delete api err >>", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="padding-x py-12 bg-gray-50 min-h-screen">
      <h1 className="font-semibold text-base mb-6">Customers List</h1>

      <div className="relative overflow-x-auto">
        {customers.length > 0 ? (
          <>
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs uppercase bg-red-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-xs">
                    Client Name
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs">
                    Client Email
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs">
                    Project Title
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs">
                    Payment Form URL
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((c, index) => {
                  return (
                    <tr className="bg-white border-b" key={index}>
                      <th scope="row" className="px-6 py-4 text-xs font-normal">
                        {c?.name}
                      </th>
                      <td className="px-6 py-4 text-xs">{c?.email}</td>
                      <td className="px-6 py-4 text-xs">{c?.projectTitle}</td>
                      <td className="px-6 py-4 text-xs">${c?.amount}</td>
                      <td className="px-6 py-4 text-xs">
                        <a
                          target="_blank"
                          href={c?.pageUrl}
                          className="underline"
                        >
                          Open Link
                        </a>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <button
                          disabled="disabled"
                          className={`font-medium text-xs px-4 py-2 rounded-lg ${
                            c?.paymentStatus == "Success"
                              ? "bg-green-100 text-green-500"
                              : c?.paymentStatus == "Pending"
                              ? "text-yellow-500 bg-yellow-100"
                              : c?.paymentStatus == "Failed"
                              ? "bg-red-100 text-red-500"
                              : ""
                          }`}
                        >
                          {c?.paymentStatus == "Success"
                            ? "Paid"
                            : c?.paymentStatus == "Pending"
                            ? "Pending"
                            : c?.paymentStatus == "Failed"
                            ? "Failed"
                            : ""}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-xs lg:pl-7">
                        <button
                          onClick={() => handleDeletePaymentFormUrl(c?.priceId)}
                          className="font-medium text-red-500 underline"
                          type="button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="w-full text-center pt-20">
            <h2>You have created any payment link.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersList;
