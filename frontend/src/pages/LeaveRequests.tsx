import { useEffect, useState } from "react";
import {
  applyLeave,
  getEmployeeLeaves,
} from "../api/leaves";


function LeaveRequests() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  const employeeId = Number(
    localStorage.getItem("employeeId")
  );

  const [leaves, setLeaves] = useState<any[]>([]);

  const pendingLeaves = leaves.filter(
    (leave: any) => leave.status === "Pending"
  ).length;

  const approvedLeaves = leaves.filter(
    (leave: any) => leave.status === "Approved"
  ).length;

  const availableLeaves = 12 - approvedLeaves;

  const handleSubmit = async () => {
    try {
      await applyLeave({
        employee_id: employeeId,
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        reason,
      });

      alert("Leave request submitted successfully");

      await loadLeaves();
      setShowModal(false);

      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit leave request");
    }
  };

  const loadLeaves = async () => {
    try {
      const data = await getEmployeeLeaves(employeeId);

      console.log("Leaves API:", data);

      setLeaves(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div className="text-white pt-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Leave Management
          </h1>

          <p className="text-slate-400 mt-3">
            Apply leave and track your leave requests
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          + Apply Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-[#0d1b45] to-[#091633] p-5 rounded-2xl border border-slate-700/50">
          <h3 className="text-slate-400">Available Leaves</h3>
          <p className="text-5xl font-bold mt-3">
            {availableLeaves}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#0d1b45] to-[#091633] p-5 rounded-2xl border border-slate-700/50">
          <h3 className="text-slate-400">Pending Requests</h3>
          <p className="text-5xl font-bold mt-3">
            {pendingLeaves}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#0d1b45] to-[#091633] p-5 rounded-2xl border border-slate-700/50">
          <h3 className="text-slate-400">Approved Leaves</h3>
          <p className="text-5xl font-bold mt-3">
            {approvedLeaves}
          </p>
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#091633] w-full max-w-2xl rounded-2xl p-6 border border-slate-700">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Apply Leave
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-4">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg p-3"
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>

              <div></div>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg p-3"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg p-3"
              />
            </div>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for leave"
              rows={4}
              className="w-full mt-4 bg-slate-800 border border-slate-700 rounded-lg p-3"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Apply Leave Form */}
      {/*<div className="bg-[#091633] rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-5">
          Apply Leave
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg p-3"
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>

          <div></div>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg p-3"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg p-3"
          />
        </div>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for leave"
          rows={4}
          className="w-full mt-4 bg-slate-800 border border-slate-700 rounded-lg p-3"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold"
        >
          Submit Leave Request
        </button>
      </div>
      */}

      {/* Leave History */}
      <div className="bg-[#091633] rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-5">
          Leave History
        </h2>

        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-3">Type</th>
              <th className="pb-3">From</th>
              <th className="pb-3">To</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave: any) => (
              <tr
                key={leave.id}
                className="border-b border-slate-800"
              >
                <td className="py-3">
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
                    className={`px-3 py-1 rounded-full text-sm font-medium ${leave.status === "Approved"
                      ? "bg-green-500/20 text-green-400"
                      : leave.status === "Rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {leave.status}
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

export default LeaveRequests;