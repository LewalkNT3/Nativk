import axios from "axios";

export const registerUser = async (data: {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/register/",
    data
  );
  return response.data;
};
