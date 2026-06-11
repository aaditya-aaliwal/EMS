import axios from "axios";

const API_URL = "http://localhost:3000/attendance";

export const markAttendance = async (
  employee_id: number
) => {
  const response = await axios.post(
    `${API_URL}/mark`,
    {
      employee_id,
      status: "Present",
    }
  );

  return response.data;
};

export const getEmployeeAttendance = async (
  employeeId: number
) => {
  const response = await axios.get(
    `${API_URL}/employee/${employeeId}`
  );

  return response.data;
};

export const getAttendanceReport = async (
  employeeId: number
) => {
  const response = await axios.get(
    `${API_URL}/report/${employeeId}`
  );

  return response.data;
};