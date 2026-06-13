import axios from "axios";

const API_URL = "https://ems-backend-x6nb.onrender.com/users";

export const getUserById = async (id: number) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};