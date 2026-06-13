import axios from "axios";

const API_URL = "https://ems-backend-x6nb.onrender.com/employees";

export const getEmployeeProfile = async (
    userId: number
) => {
    const response = await axios.get(
        `${API_URL}/user/${userId}`
    );

    return response.data;
};

export const updateEmployee = async (
    id: number,
    data: any
) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        data
    );

    return response.data;
};