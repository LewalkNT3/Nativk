import axios from "axios";

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
