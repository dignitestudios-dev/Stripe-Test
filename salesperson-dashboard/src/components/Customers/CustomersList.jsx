import React, { useEffect, useState } from "react";
import customerServices from "../../services/customerServices";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const resp = await customerServices.handleFetchCustomers();
      console.log("res >> ", resp.data);
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
      alert(res.message);

      // Update the customers list by filtering out the deleted customer
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.priceId !== priceId)
      );
    } catch (error) {
      console.log("delete api err >>", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="padding-x py-12">
      <h1 className="font-semibold text-base mb-6">Customers List</h1>

      <div className="relative overflow-x-auto">
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
                Salesperson Name
              </th>
              <th scope="col" className="px-6 py-4 text-xs">
                Payment Form URL
              </th>
              <th scope="col" className="px-6 py-4 text-xs">
                Delete url
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => {
              return (
                <tr className="bg-white border-b" key={index}>
                  <th scope="row" className="px-6 py-4 text-xs font-normal">
                    {c?.name}
                  </th>
                  <td className="px-6 py-4 text-xs">{c?.email}</td>
                  <td className="px-6 py-4 text-xs">{c?.projectTitle}</td>
                  <td className="px-6 py-4 text-xs">${c?.amount}</td>
                  <td className="px-6 py-4 text-xs">
                    {c?.salesPersonName ? c?.salesPersonName : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <a target="_blank" href={c?.pageUrl} className="underline">
                      Open Form
                    </a>
                  </td>
                  <td className="px-6 py-4 text-xs">
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
      </div>
    </div>
  );
};

export default CustomersList;
