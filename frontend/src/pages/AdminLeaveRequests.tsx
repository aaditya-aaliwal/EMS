import { useEffect, useState } from "react";
import {
    getAllLeaves,
    updateLeaveStatus,
} from "../api/leaves";

function AdminLeaveRequests() {
    const [leaves, setLeaves] = useState<any[]>([]);

    const loadLeaves = async () => {
        try {
            const data = await getAllLeaves();
            console.log("Leaves Data:", data);
            setLeaves(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadLeaves();
    }, []);

    const handleStatusUpdate = async (
        leaveId: number,
        status: string
    ) => {
        try {
            await updateLeaveStatus(
                leaveId,
                status,
                1
            );

            loadLeaves();
        } catch (error) {
            console.error(error);
        }
    };

    const totalRequests = leaves.length;

    const pendingRequests = leaves.filter(
        (leave) => leave.status === "Pending"
    ).length;

    const approvedRequests = leaves.filter(
        (leave) => leave.status === "Approved"
    ).length;

    const rejectedRequests = leaves.filter(
        (leave) => leave.status === "Rejected"
    ).length;

    return (
        <div className="text-white px-1 md:px-0">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Leave Requests
                </h1>

                <p className="text-slate-400 mt-2">
                    Manage employee leave requests
                </p>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">

                <div className="bg-[#091633] rounded-2xl p-5 border border-slate-700/50">
                    <p className="text-slate-400">Total Requests</p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        {totalRequests}
                    </h2>
                </div>

                <div className="bg-[#091633] rounded-2xl p-5 border border-slate-700/50">
                    <p className="text-slate-400">Pending</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mt-2">
                        {pendingRequests}
                    </h2>
                </div>

                <div className="bg-[#091633] rounded-2xl p-5 border border-slate-700/50">
                    <p className="text-slate-400">Approved</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-green-400 mt-2">
                        {approvedRequests}
                    </h2>
                </div>

                <div className="bg-[#091633] rounded-2xl p-5 border border-slate-700/50">
                    <p className="text-slate-400">Rejected</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-red-400 mt-2">
                        {rejectedRequests}
                    </h2>
                </div>

            </div>

            <div className="bg-[#091633] rounded-2xl p-6 overflow-x-auto">
                <table className="min-w-[900px] w-full">
                    <thead>
                        <tr className="border-b border-slate-700 text-slate-400">
                            <th className="text-left py-3">Employee</th>
                            <th className="text-left py-3">Type</th>
                            <th className="text-left py-3">From</th>
                            <th className="text-left py-3">To</th>
                            <th className="text-left py-3">Status</th>
                            <th className="text-left py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaves.map((leave) => (
                            <tr
                                key={leave.id}
                                className="border-b border-slate-800"
                            >
                                <td className="py-4">
                                    <div className="font-semibold">
                                        {leave.employee?.first_name} {leave.employee?.last_name}
                                    </div>

                                    <div className="text-sm text-slate-400">
                                        {leave.employee?.employee_code}
                                    </div>
                                </td>

                                <td>
                                    {leave.leave_type}
                                </td>

                                <td>
                                    {leave.start_date}
                                </td>

                                <td>
                                    {leave.end_date}
                                </td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                                ${leave.status === "Approved"
                                                ? "bg-green-500/20 text-green-400"
                                                : leave.status === "Rejected"
                                                    ? "bg-red-500/20 text-red-400"
                                                    : "bg-yellow-500/20 text-yellow-400"}`}>
                                        {leave.status}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    <button
                                        disabled={leave.status === "Approved"}
                                        onClick={() =>
                                            handleStatusUpdate(
                                                leave.id,
                                                "Approved"
                                            )
                                        }
                                        className={`px-2 md:px-3 py-1 rounded text-sm text-white ${leave.status === "Approved"
                                            ? "bg-slate-600 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700"
                                            }`}
                                    >
                                        Approve
                                    </button>

                                    <button
                                        disabled={leave.status === "Rejected"}
                                        onClick={() =>
                                            handleStatusUpdate(
                                                leave.id,
                                                "Rejected"
                                            )
                                        }
                                        className={`px-2 md:px-3 py-1 rounded text-sm text-white ${leave.status === "Rejected"
                                            ? "bg-slate-600 cursor-not-allowed"
                                            : "bg-red-600 hover:bg-red-700"
                                            }`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminLeaveRequests;