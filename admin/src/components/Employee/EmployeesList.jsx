import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeesList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/get-employees`, {
        headers: {
          Authorization: `${Cookies.get("digniteToken")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Employees data:", res.data.data);
      setEmployees(res?.data?.data);
      // return res.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      if (error.response && error.response.status === 401) {
        console.log("Session expired. Please log in again.");
        Cookies.remove("digniteToken");
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (_id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/delete-employee/${_id}`
      );
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting user");
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl min-h-screen">
      <h2 className="text-lg font-semibold">Employees List</h2>
      <div>
        <table className="employee-table w-full mt-6">
          <thead>
            <tr className="bg-red-100">
              <th className="text-start text-sm text-red-500 py-4 pl-10">
                Name
              </th>
              <th className="text-start text-sm text-red-500 py-4">Email</th>
              <th className="text-start text-sm text-red-500 py-4">
                Job Position
              </th>
              <th className="text-start text-sm text-red-500 py-4">
                Department
              </th>
              <th className="text-start text-sm text-red-500 py-4">
                Organization
              </th>
              <th className="text-start text-sm text-red-500 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, index) => (
              <tr
                key={employee._id}
                className={`border-b ${index % 2 == 1 && "bg-gray-100"}`}
              >
                <td className="text-[13px] font-medium py-4 pl-10">
                  {employee?.name}
                </td>
                <td className="text-[13px] font-medium py-4">
                  {employee?.email}
                </td>
                <td className="text-[13px] font-medium py-4">
                  {employee?.jobPosition}
                </td>
                <td className="text-[13px] font-medium py-4">
                  {employee?.department}
                </td>
                <td className="text-[13px] font-medium py-4">
                  {employee?.organization}
                </td>
                <td className="text-[13px] font-medium py-4 flex items-center justify-start gap-2">
                  <Link
                    to={`/update-employee/${employee?._id}`}
                    className="bg-green-100 px-4 py-2 rounded-md text-xs font-semibold text-green-700"
                  >
                    Update
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteEmployee(employee._id)}
                    className="bg-red-100 px-4 py-2 rounded-md text-xs font-semibold text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesList;
