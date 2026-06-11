import { useEffect, useState } from "react";
import {
    markAttendance,
    getEmployeeAttendance,
    getAttendanceReport,
} from "../api/attendance";


export default function Attendance() {

    const employeeId = Number(
        localStorage.getItem("employeeId")
    );

    const [history, setHistory] = useState<any[]>([]);
    const [report, setReport] = useState({
        workingDays: 0,
        present: 0,
        absent: 0,
        percentage: 0,
    });

    const loadAttendanceData = async () => {
        try {
            const historyData =
                await getEmployeeAttendance(employeeId);

            const reportData =
                await getAttendanceReport(employeeId);

            setHistory(historyData);
            setReport(reportData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadAttendanceData();
    }, []);

    const handleMarkAttendance = async () => {
        try {
            await markAttendance(employeeId);

            alert("Attendance marked successfully");

            loadAttendanceData();
        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                "Attendance already marked"
            );
        }
    };


    return (
            <div className="text-white max-w-7xl pt-5">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white">
                    Attendance
                </h1>

                <p className="text-slate-400 mt-2">
                    Mark attendance and view attendance history
                </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#091633] p-6 rounded-2xl border-l-4 border-green-500">
                    <h3 className="text-slate-400">Present Days</h3>
                    <p className="text-4xl font-bold mt-2">
                        {report.present}
                    </p>
                </div>

                <div className="bg-[#091633] p-6 rounded-2xl border-l-4 border-red-500">
                    <h3 className="text-slate-400">Absent Days</h3>
                    <p className="text-4xl font-bold mt-2">
                        {report.absent}
                    </p>
                </div>

                <div className="bg-[#091633] p-6 rounded-2xl border-l-4 border-blue-500">
                    <h3 className="text-slate-400">Attendance %</h3>
                    <p className="text-4xl font-bold mt-2">
                        {report.percentage}%
                    </p>
                </div>
            </div>

            {/* Mark Attendance */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Mark Attendance
                </h2>

                <button
                    onClick={handleMarkAttendance}
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium"
                >
                    Mark Present
                </button>
            </div>

            {/* Attendance History */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h2 className="text-xl font-semibold mb-5">
                    Attendance History
                </h2>

                <table className="w-full">
                    <thead>
                        <tr className="text-left text-slate-400 border-b border-slate-700">
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {history.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t border-slate-700"
                            >
                                <td className="py-3">
                                    {item.attendance_date}
                                </td>

                                <td
                                    className={`py-3 ${item.status === "Present"
                                        ? "text-green-400"
                                        : "text-red-400"
                                        }`}
                                >
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mt-8">
                <h2 className="text-xl font-semibold mb-4">
                    Monthly Attendance Report
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-slate-400">Working Days</p>
                        <p className="text-3xl font-bold">
                            {report.present + report.absent}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400">Present</p>
                        <p className="text-3xl font-bold text-green-400">
                            {report.present}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400">Absent</p>
                        <p className="text-3xl font-bold text-red-400">
                            {report.absent}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}