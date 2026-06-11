import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function AdminLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };
    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-indigo-400">
                    QuickEMS
                </h1>

                <button onClick={() => setSidebarOpen(true)}>
                    <FaBars size={22} />
                </button>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`
        fixed top-0 left-0 z-50
        h-screen w-72
        bg-slate-900
        border-r border-slate-800
        transform transition-transform duration-300
        md:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setSidebarOpen(false)}>
                        <FaTimes size={22} />
                    </button>
                </div>

                <div className="px-5">
                    <h1 className="text-3xl font-bold text-indigo-400">
                        QuickEMS
                    </h1>

                    <p className="text-slate-400 text-sm mt-1">
                        Employee Management System
                    </p>
                </div>

                <div className="p-5 space-y-3">
                    <NavLink to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="block p-3 rounded-lg hover:bg-slate-800">
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/employees" onClick={() => setSidebarOpen(false)} className="block p-3 rounded-lg hover:bg-slate-800">
                        Employees
                    </NavLink>

                    <NavLink to="/admin/departments" onClick={() => setSidebarOpen(false)} className="block p-3 rounded-lg hover:bg-slate-800">
                        Departments
                    </NavLink>

                    <NavLink to="/admin/attendance" onClick={() => setSidebarOpen(false)} className="block p-3 rounded-lg hover:bg-slate-800">
                        Attendance
                    </NavLink>

                    <NavLink to="/admin/leave-requests" onClick={() => setSidebarOpen(false)} className="block p-3 rounded-lg hover:bg-slate-800">
                        Leave Requests
                    </NavLink>

                    <NavLink to="/admin/profile" onClick={() => setSidebarOpen(false)} className="block p-3 rounded-lg hover:bg-slate-800">
                        Profile
                    </NavLink>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>
            {/* Sidebar */}
            <div>
                <div className="hidden md:flex w-72 h-screen sticky top-0 bg-slate-900 border-r border-slate-800 flex-col">
                    <div className="p-5 border-t border-slate-800 mt-auto">
                        <h1 className="text-3xl font-bold text-indigo-400">
                            QuickEMS
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Employee Management System
                        </p>
                    </div>

                    <div className="flex-1 p-5 space-y-3">
                        <div className="bg-indigo-600 p-4 rounded-xl">
                            <h2 className="font-semibold">Admin Portal</h2>
                            <p className="text-sm text-indigo-100 mt-1">
                                Workforce Management
                            </p>
                        </div>

                        <NavLink
                            to="/admin/dashboard"
                            className={({ isActive }) =>
                                `block w-full p-3 rounded-lg transition ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-slate-800"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/employees"
                            className={({ isActive }) =>
                                `block w-full p-3 rounded-lg transition ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-slate-800"
                                }`
                            }
                        >
                            Employees
                        </NavLink>

                        <NavLink
                            to="/admin/departments"
                            className={({ isActive }) =>
                                `block w-full p-3 rounded-lg transition ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-slate-800"
                                }`
                            }
                        >
                            Departments
                        </NavLink>

                        <NavLink
                            to="/admin/attendance"
                            className={({ isActive }) =>
                                `block w-full p-3 rounded-lg transition ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-slate-800"
                                }`
                            }
                        >
                            Attendance
                        </NavLink>

                        <NavLink
                            to="/admin/leave-requests"
                            className={({ isActive }) =>
                                `block w-full p-3 rounded-lg transition ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-slate-800"
                                }`
                            }
                        >
                            Leave Requests
                        </NavLink>

                        <NavLink
                            to="/admin/profile"
                            className={({ isActive }) =>
                                `block w-full p-3 rounded-lg transition ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-slate-800"
                                }`
                            }
                        >
                            Profile
                        </NavLink>
                    </div>

                    <div className="p-5 border-t border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium transition"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto min-h-screen">
                <Outlet />
            </div>

        </div>
    );
}

export default AdminLayout;


















