import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const getUserById = async (id: number) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};