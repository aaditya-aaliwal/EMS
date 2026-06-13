import axios from "axios";

const API_URL = "https://ems-backend-x6nb.onrender.com/departments";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

export const getDepartment = async (
    id: number
) => {
    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;
};

export const getDepartments = async () => {
    const response = await axios.get(
        API_URL,
        getAuthHeader()
    );

    return response.data;
};
export const createDepartment = async (
    data: {
        department_name: string;
        description: string;
    }
) => {
    const response = await axios.post(
        API_URL,
        data,
        getAuthHeader()
    );

    return response.data;
};

export const updateDepartment = async (
    id: number,
    data: {
        department_name: string;
        description: string;
    }
) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        data,
        getAuthHeader()
    );

    return response.data;
};

export const deleteDepartment = async (
    id: number
) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        getAuthHeader()
    );

    return response.data;
};

