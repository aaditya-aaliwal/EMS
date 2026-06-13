import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaClipboardList,
  FaUserCircle,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [attendanceToday, setAttendanceToday] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);

  useEffect(() => {
    fetch("https://ems-backend-x6nb.onrender.com/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployeeCount(data.length);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
      });

    fetch("https://ems-backend-x6nb.onrender.com/attendance")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().split("T")[0];

        const todayAttendance = data.filter(
          (item: any) =>
            item.attendance_date === today
        );

        setAttendanceToday(todayAttendance.length);
      })
      .catch((err) => {
        console.error("Error fetching attendance:", err);
      });

    fetch("https://ems-backend-x6nb.onrender.com/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartmentCount(data.length);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
      });

    fetch("https://ems-backend-x6nb.onrender.com/leaves")
      .then((res) => res.json())
      .then((data) => {
        const pending = data.filter(
          (leave: any) => leave.status === "Pending"
        );

        setPendingLeaves(pending.length);
      })
      .catch((err) => {
        console.error("Error fetching leaves:", err);
      });
  }, []);

  const cards = [
    {
      title: "Employee Management",
      description: "Add, edit and manage employees",
      icon: <FaUsers size={28} />,
      path: "/admin/employees",
    },
    {
      title: "Department Management",
      description: "Create and manage departments",
      icon: <FaBuilding size={28} />,
      path: "/admin/departments",
    },
    {
      title: "Attendance",
      description: "Track employee attendance",
      icon: <FaCalendarCheck size={28} />,
      path: "/admin/attendance",
    },
    {
      title: "Leave Management",
      description: "Approve and manage leave requests",
      icon: <FaClipboardList size={28} />,
      path: "/admin/leave-requests",
    },
    {
      title: "Profile",
      description: "View and update profile",
      icon: <FaUserCircle size={28} />,
      path: "/admin/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Main Content */}
      <div className="flex-1 px-8 pb-8 pt-0">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Welcome Admin 👋
          </h1>
          <p className="text-slate-400 mt-2">
            Manage employees, departments, attendance
            and leave requests from one dashboard.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* Employee Card */}
          <div className="bg-slate-900 p-6 rounded-2xl border-l-4 border-blue-500 shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400">Total Employees</p>
                <h2 className="text-4xl font-bold mt-2">
                  {employeeCount}
                </h2>
              </div>

              <FaUsers className="text-blue-400 text-4xl" />
            </div>
          </div>

          {/* Department Card */}

          <div className="bg-slate-900 p-6 rounded-2xl border-l-4 border-green-500 shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400">Departments</p>
                <h2 className="text-4xl font-bold mt-2">
                  {departmentCount}
                </h2>
              </div>

              <FaBuilding className="text-green-400 text-4xl" />
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border-l-4 border-yellow-500 shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400">Attendance Today</p>
                <h2 className="text-4xl font-bold mt-2">
                  {attendanceToday}
                </h2>
              </div>

              <FaCalendarCheck className="text-yellow-400 text-4xl" />
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border-l-4 border-red-500 shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400">Pending Leaves</p>
                <h2 className="text-4xl font-bold mt-2">
                  {pendingLeaves}
                </h2>
              </div>

              <FaClipboardList className="text-red-400 text-4xl" />
            </div>
          </div>
        </div>


        {/* Modules */}
        <h2 className="text-2xl font-semibold mb-5">
          Management Modules
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 hover:-translate-y-1 transition cursor-pointer"
            >
              <div className="text-indigo-400 mb-4">
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {card.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;