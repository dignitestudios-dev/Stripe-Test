// src/services/authService.js
import axios from "axios";
import { BASE_URL } from "../api/api";

// Register new user
const register = async (username, email, password) => {
  const response = await axios.post(BASE_URL + "/admin/register", {
    username,
    email,
    password,
  });

  return response.data;
};

// Login user
const login = async (email, password) => {
  const response = await axios.post(BASE_URL + "/admin/login", {
    email,
    password,
  });

  if (response.token) {
    // Save the token in localStorage
    localStorage.setItem("digniteToken", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("digniteToken");
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("digniteToken"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
