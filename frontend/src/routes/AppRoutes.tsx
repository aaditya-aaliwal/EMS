import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/AdminLayout";
import EmployeeLayout from "../components/EmployeeLayout";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";
import EmployeeLogin from "../pages/EmployeeLogin";
import AdminDashboard from "../pages/AdminDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import EmployeeList from "../pages/EmployeeList";
import Departments from "../pages/Departments";
import Attendance from "../pages/Attendance";
import LeaveRequests from "../pages/LeaveRequests";
import Profile from "../pages/Profile";
import AdminAttendance from "../pages/AdminAttendance";
import AdminLeaveRequests from "../pages/AdminLeaveRequests";
import AdminProfile from "../pages/AdminProfile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/employee" element={<EmployeeLogin />} />

      <Route path="/admin" element={
        <ProtectedRoute> <AdminLayout /> </ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="departments" element={<Departments />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="leave-requests" element={<AdminLeaveRequests />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      <Route path="/employee" element={
        <ProtectedRoute> <EmployeeLayout  /> </ProtectedRoute>}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leave" element={<LeaveRequests />} />
        <Route path="profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}