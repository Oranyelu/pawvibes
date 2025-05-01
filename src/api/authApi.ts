// src/api/authApi.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const login = async (credentials: { email: string; password: string }) => {
  const res = await axios.post(`${BASE_URL}/login`, credentials, {
    withCredentials: true,
  });
  return res.data;
};

export const register = async (details: {
  email: string;
  password: string;
  name: string;
  username: string;
}) => {
  const res = await axios.post(`${BASE_URL}/register`, details, {
    withCredentials: true,
  });
  return res.data;
};
