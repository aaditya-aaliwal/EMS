import axios from "axios";

const API_URL = "http://localhost:3000/leaves";

export const applyLeave = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getEmployeeLeaves = async (
  employeeId: number
) => {
  const response = await axios.get(
    `${API_URL}/employee/${employeeId}`
  );

  return response.data;
};

export const getAllLeaves = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateLeaveStatus = async (
  leaveId: number,
  status: string,
  approvedBy: number
) => {
  const response = await axios.patch(
    `${API_URL}/${leaveId}/status`,
    {
      status,
      approved_by: approvedBy,
    }
  );

  return response.data;
};