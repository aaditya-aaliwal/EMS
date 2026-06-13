import { useEffect, useState } from "react";
import {
    FaUserCheck,
    FaUserTimes,
    FaClipboardList,
} from "react-icons/fa";

export default function AdminAttendance() {
    const [attendance, setAttendance] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");
    useEffect(() => {
        loadAttendance();
    }, []);


    const loadAttendance = async () => {
        try {
            const response = await fetch(
                "https://ems-backend-x6nb.onrender.com/attendance"
            );

            const data = await response.json();
            setAttendance(data);
        } catch (error) {
            console.error(error);
        }
    };

    const presentCount = attendance.filter(
        (item) => item.status === "Present"
    ).length;

    const absentCount = attendance.filter(
        (item) => item.status === "Absent"
    ).length;

    const filteredAttendance = attendance.filter((item: any) => {
        const matchesSearch =
            item.employee_name
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All"
                ? true
                : item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white">
                    Attendance Management
                </h1>

                <p className="text-slate-400 mt-2">
                    Monitor employee attendance records and workforce presence.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#091633] rounded-2xl p-5 border border-slate-800 hover:border-green-500 transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-slate-400 text-sm">
                                Present Records
                            </h3>

                            <p className="text-3xl font-bold mt-2 text-white">
                                {presentCount}
                            </p>
                        </div>

                        <FaUserCheck
                            size={28}
                            className="text-green-400"
                        />
                    </div>
                </div>

                <div className="bg-[#091633] rounded-2xl p-5 border border-slate-800 hover:border-red-500 transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-slate-400 text-sm">
                                Absent Records
                            </h3>

                            <p className="text-3xl font-bold mt-2 text-white">
                                {absentCount}
                            </p>
                        </div>

                        <FaUserTimes
                            size={28}
                            className="text-red-400"
                        />
                    </div>
                </div>

                <div className="bg-[#091633] rounded-2xl p-5 border border-slate-800 hover:border-indigo-500 transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-slate-400 text-sm">
                                Total Records
                            </h3>

                            <p className="text-3xl font-bold mt-2 text-white">
                                {attendance.length}
                            </p>
                        </div>

                        <FaClipboardList
                            size={28}
                            className="text-indigo-400"
                        />
                    </div>
                </div>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search employee name..."
                    className="flex-1 bg-[#091633] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#091633] border border-slate-700 rounded-xl px-4 py-3 text-white"
                    >
                        <option value="All">All Status</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
            
            </div>

            {/* Attendance Table */}
            <div className="bg-[#091633] rounded-3xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-2xl font-semibold text-white">
                        Attendance Records
                    </h2>

                    <p className="text-slate-400 mt-1">
                        Complete attendance history of employees
                    </p>
                </div>

                <table className="w-full text-white text-sm">
                    <thead>
                        <tr className="border-b border-slate-800">
                            <th className="text-left py-4 px-6 text-slate-400 font-medium">
                                Employee
                            </th>

                            <th className="text-left py-4 text-slate-400 font-medium">
                                Date
                            </th>

                            <th className="text-left py-4 text-slate-400 font-medium">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAttendance.map((item: any, index) => (
                            <tr
                                key={item.id}
                                className={`
                                    border-b border-slate-800
                                    ${index % 2 === 0
                                        ? ""
                                        : "bg-slate-900/20"
                                    }
                                    hover:bg-slate-800/30 transition
                                `}
                            >
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-white">
                                            {item.employee_name}
                                        </span>

                                        <span className="text-xs text-slate-400">
                                            {item.employee_code}
                                        </span>
                                    </div>
                                </td>

                                <td className="py-4">
                                    {item.attendance_date}
                                </td>

                                <td className="py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Present"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}