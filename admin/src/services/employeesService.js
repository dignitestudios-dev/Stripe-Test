import axios from "axios";
import { BASE_URL } from "../api/api";
import Cookies from "js-cookie";

const fetchEmployees = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/get-employees`, {
      headers: {
        Authorization: `${Cookies.get("digniteToken")}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Employees data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., token expired)
      console.log("Session expired. Please log in again.");
      Cookies.remove("digniteToken");
      navigate("/login");
    }
  }
};

const handleFetchCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/get-customers`);
    return await response;
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default { fetchEmployees, handleFetchCustomers };
