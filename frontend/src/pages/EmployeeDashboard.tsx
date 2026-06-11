import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAttendanceReport } from "../api/attendance";
import { updateEmployee } from "../api/employees";


export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const employeeId = Number(
    localStorage.getItem("employeeId")
  );
  const [status, setStatus] = useState("Active");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const employeeName =
    localStorage
      .getItem("email")
      ?.split("@")[0] || "Employee";
  const [report, setReport] = useState({
    workingDays: 0,
    present: 0,
    absent: 0,
    percentage: 0,
  });

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await getAttendanceReport(employeeId);
      setReport(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (
    newStatus: string
  ) => {
    try {
      await updateEmployee(employeeId, {
        status: newStatus,
      });

      setStatus(newStatus);

      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome, {employeeName} 👋
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Manage your attendance, leave requests and profile from one dashboard.
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="bg-[#091633] border border-slate-700 rounded-full px-4 py-2 hover:border-indigo-500 transition"
          >
            <span
    className={`font-medium ${
        status === "Active"
            ? "text-green-400"
            : status === "Busy"
            ? "text-yellow-400"
            : "text-red-400"
    }`}
>
    ● {status}
</span>
          </button>

          {showStatusMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-[#091633] border border-slate-700 rounded-xl shadow-lg overflow-hidden z-50">

              <button
                onClick={() => {
                  handleStatusChange("Active");
                  setShowStatusMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-slate-800"
              >
                🟢 Active
              </button>

              <button
                onClick={() => {
                  handleStatusChange("Busy");
                  setShowStatusMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-slate-800"
              >
                🟡 Busy
              </button>

              <button
                onClick={() => {
                  handleStatusChange("Offline");
                  setShowStatusMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-slate-800"
              >
                🔴 Offline
              </button>

            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-slate-400 text-lg">Days Present</h3>
          <p className="text-4xl font-bold mt-2 text-white">{report.present}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-slate-400 text-lg">Pending Leaves</h3>
          <p className="text-4xl font-bold mt-2 text-white">2</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-slate-400">Attendance %</h3>
          <p className="text-4xl font-bold mt-2 text-white">{report.percentage}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/employee/attendance")}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold"
          >
            Mark Attendance
          </button>
          <button
            onClick={() => navigate("/employee/leave")}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
          >
            Apply Leave
          </button>
        </div>
      </div>

      {/* Employee Modules */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Employee Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/employee/attendance")}
            className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-indigo-500 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2">
              Attendance
            </h3>

            <p className="text-slate-400">
              Mark attendance and view attendance history
            </p>
          </div>

          <div
            onClick={() => navigate("/employee/leave")}
            className="bg-[#091633] rounded-2xl p-6 border border-slate-800 hover:border-green-500 transition cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Leave Management
            </h3>

            <p className="text-slate-400">
              Apply leave and track leave status
            </p>
          </div>

          <div
            onClick={() => navigate("/employee/profile")}
            className="bg-[#091633] rounded-2xl p-6 border border-slate-800 hover:border-purple-500 transition cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Profile
            </h3>

            <p className="text-slate-400">
              View and update profile information
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}