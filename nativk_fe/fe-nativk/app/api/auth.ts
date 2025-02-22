import axios from "axios";

export const registerUser = async (data: {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  dni: string;
  phone: string;
  password: string;
}) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/register/",
    data
  );
  return response.data;
};

export const loginUser = async (credentials: {
  username?: string;
  email?: string;
  password?: string;
}) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/login/",
    credentials
  );
  return response.data;
};
