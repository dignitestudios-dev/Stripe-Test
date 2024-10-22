import axios from "axios";
import { BASE_URL } from "../api";

const handleResponse = async (response) => {
  try {
    if (response.status === 200 || response.status === 201) {
      return await response.data;
    }
  } catch (error) {
    throw new Error(response.statusText || "An unkown error occurred");
  }
};

const handleFetchCustomerByPriceId = async (priceId) => {
  try {
    const response = await axios.get(
      `http://18.217.130.44:5173/api/customers/get-customer/${priceId}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default {
  handleFetchCustomerByPriceId,
};
