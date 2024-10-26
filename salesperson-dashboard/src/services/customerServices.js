import axios from "axios";
import { BASE_URL } from "../api";

const handleResponse = async (response) => {
  if (response.status === 200 || response.status === 201) {
    return await response.data;
  } else {
    throw new Error(response.statusText || "An unknown error occurred.");
  }
};

const handleCreateCustomer = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/customers/create-customer`,
      data
    );
    return await handleResponse(response);
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data.message || "Server Error";

      if (statusCode >= 400 && statusCode < 500) {
        if (statusCode === 400) {
          throw new Error("Bad request. Please check the input data.");
        } else if (statusCode === 401) {
          throw new Error("Unauthorized. Please check your credentials.");
        } else if (statusCode === 403) {
          throw new Error("Forbidden. You don't have access to this resource.");
        } else if (statusCode === 404) {
          throw new Error("Resource not found.");
        } else {
          throw new Error(`Client Error: ${errorMessage}`);
        }
      } else if (statusCode >= 500) {
        throw new Error(`Server Error: ${errorMessage}`);
      }
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error(`Unexpected Error: ${error.message}`);
    }
  }
};

const handleFetchCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/get-customers`);
    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

const handleDeleteFormUrl = async (priceId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/customers/delete-customer`,
      {
        data: { priceId },
      }
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default {
  handleCreateCustomer,
  handleFetchCustomers,
  handleDeleteFormUrl,
};
