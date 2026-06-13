import axios from "axios";

const API_URL = "https://ems-backend-x6nb.onrender.com/auth";

export const login = async (
    email: string,
    password: string
) => {
    const response = await axios.post(
        `${API_URL}/login`,
        {
            email,
            password,
        }
    );

    return response.data;
};

export const changePassword = async (
    userId: number,
    currentPassword: string,
    newPassword: string
) => {
    const response = await axios.put(
        `${API_URL}/change-password`,
        {
            userId,
            currentPassword,
            newPassword,
        }
    );

    return response.data;
};