import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ListSkeleton from "../Global/ListSkeleton";

const PaymentLinksList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/customers/get-customers`, {
        headers: {
          Authorization: `${Cookies.get("digniteToken")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("payment forms:", res.data.data);
      setEmployees(res?.data?.data);
      // return res.data;
    } catch (error) {
      console.error("Error fetching payment forms:", error);
      if (error.response && error.response.status === 401) {
        console.log("Session expired. Please log in again.");
        Cookies.remove("digniteToken");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Payment Links";
    fetchEmployees();
  }, []);

  function formatDate(createdAt) {
    const date = new Date(createdAt);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="bg-white p-6 rounded-xl min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold">Payment Links</h2>
        {/* <Link
          to="/create-payment-link"
          className="red-bg text-white text-xs font-medium px-4 py-3 rounded-lg"
        >
          Create Payment Link
        </Link> */}
      </div>
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          {employees.length > 0 ? (
            <>
              <div>
                <table className="employee-table w-full mt-6">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="text-start text-xs red-text py-4 uppercase pl-10">
                        Client Name
                      </th>
                      <th className="text-start text-xs red-text py-4 uppercase">
                        Client Email
                      </th>

                      <th className="text-start text-xs red-text py-4 uppercase">
                        Project Title
                      </th>
                      <th className="text-start text-xs red-text py-4 uppercase">
                        Amount
                      </th>
                      <th className="text-start text-xs red-text py-4 uppercase">
                        Created By
                      </th>
                      <th className="text-start text-xs red-text py-4 uppercase">
                        Organization
                      </th>
                      <th className="text-start text-xs red-text py-4 uppercase">
                        Date
                      </th>
                      <th className="text-start text-xs red-text py-4 uppercase">
                        Link
                      </th>
                      <th className="text-start text-xs red-text py-4 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees?.map((employee, index) => (
                      <tr
                        key={employee._id}
                        className={`border-b ${
                          index % 2 == 1 && "bg-gray-100"
                        }`}
                      >
                        <td className="text-xs font-medium py-4 pl-10">
                          {employee?.name}
                        </td>
                        <td className="text-xs font-medium py-4">
                          {employee?.email}
                        </td>
                        <td className="text-xs font-medium py-4">
                          {employee?.projectTitle}
                        </td>
                        <td className="text-xs font-medium py-4">
                          ${employee?.amount}
                        </td>
                        <td className="text-xs font-medium py-4">
                          {employee?.salesPerson
                            ? employee?.salesPerson?.name
                            : "N/A"}
                        </td>
                        <td className="text-xs font-medium py-4">
                          {employee?.salesPerson?.organization?.organizationName
                            ? employee?.salesPerson?.organization
                                ?.organizationName
                            : "N/A"}
                        </td>
                        <td className="text-xs font-medium py-4">
                          {employee?.createdAt
                            ? formatDate(employee?.createdAt)
                            : "N/A"}
                        </td>
                        <td className="text-xs font-medium py-4">
                          <a
                            href={employee?.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-xs underline"
                          >
                            Open Form
                          </a>
                          {employee?.organization}
                        </td>
                        <td className="text-xs font-medium py-4">
                          <button
                            type="button"
                            className="text-xs font-semibold text-yellow-500"
                          >
                            Pending
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="w-full pt-36 text-center">
                <h2>No payment links have been created yet.</h2>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentLinksList;
