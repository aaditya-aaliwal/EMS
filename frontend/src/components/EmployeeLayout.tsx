import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#020B2D] text-white flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#081330] border-b border-slate-800 px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-400">
          QuickEMS
        </h1>

        <button onClick={() => setSidebarOpen(true)}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-72
          bg-[#081330]
          border-r border-slate-800
          flex flex-col justify-between
          z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div>
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={closeSidebar}>
              <FaTimes size={22} />
            </button>
          </div>

          <div className="p-6">
            <h1 className="text-4xl font-bold text-indigo-400">
              QuickEMS
            </h1>

            <p className="text-slate-400 mt-2">
              Employee Portal
            </p>
          </div>

          <div className="px-4 mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4">
              <h3 className="font-bold text-xl">
                Employee Portal
              </h3>

              <p className="text-sm text-slate-200">
                Self Service Dashboard
              </p>
            </div>
          </div>

          <nav className="px-4 space-y-3">
            <NavLink
              to="/employee/dashboard"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/employee/attendance"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              Attendance
            </NavLink>

            <NavLink
              to="/employee/leave"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              Leave
            </NavLink>

            <NavLink
              to="/employee/profile"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              Profile
            </NavLink>
          </nav>
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-0 pt-20 md:pt-0 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}