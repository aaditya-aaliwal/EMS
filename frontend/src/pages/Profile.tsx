import { useEffect, useState } from "react";
import { getEmployeeProfile, updateEmployee } from "../api/employees";
import { getDepartment } from "../api/departments";
import { changePassword } from "../api/auth";
import { getEmployeeLeaves } from "../api/leaves";
import { getEmployeeAttendance } from "../api/attendance";


interface ProfileData {
    id: number;
    first_name: string;
    last_name: string;
    designation: string;
    status: string;
    employee_code: string;
    email: string;
    phone: string;
    joining_date: string;
    department_id: number;
    department_name?: string;
    years_of_service?: number;
    leave_balance?: number;
    attendance_rate?: number;
}

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
    return (
        <div className={`bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 flex items-center gap-4`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</p>
                <p className="text-white text-xl font-bold mt-0.5">{value}</p>
            </div>
        </div>
    );
}

function EditModal({
    profile,
    onClose,
    onSave,
}: {
    profile: ProfileData;
    onClose: () => void;
    onSave: (updated: Partial<ProfileData>) => Promise<void>;
}) {
    const [form, setForm] = useState({
        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",
        phone: profile.phone ?? "",
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async () => {
        setSaving(true);
        await onSave(form);
        setSaving(false);
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            onClose();
        }, 900);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl p-8 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-xl font-bold">Edit Profile</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">

                    <div>
                        <label className="text-slate-400 text-xs font-medium uppercase tracking-wide block mb-1.5">
                            First Name
                        </label>

                        <input
                            type="text"
                            value={form.first_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    first_name: e.target.value,
                                })
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-slate-400 text-xs font-medium uppercase tracking-wide block mb-1.5">
                            Last Name
                        </label>

                        <input
                            type="text"
                            value={form.last_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    last_name: e.target.value,
                                })
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-slate-400 text-xs font-medium uppercase tracking-wide block mb-1.5">
                            Phone
                        </label>

                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                })
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                    </div>

                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving || saved}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${saved
                            ? "bg-green-500 text-white"
                            : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                            } disabled:opacity-70`}
                    >
                        {saved ? "✓ Saved" : saving ? "Saving…" : "Save changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Profile() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");
    const [passwordOpen, setPasswordOpen] =
        useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const data = await getEmployeeProfile(Number(userId));

                const employeeId = Number(
                    localStorage.getItem("employeeId")
                );

                const leaves = await getEmployeeLeaves(employeeId);

                const approvedLeaves = leaves.filter(
                    (leave: any) => leave.status === "Approved"
                ).length;

                const availableLeaves = 12 - approvedLeaves;

                const dept = await getDepartment(
                    data.department_id
                );

                const departmentName =
                    dept.department_name;

                // Calculate years of service
                const joined = new Date(data.joining_date);
                const years = (
                    (Date.now() - joined.getTime()) /
                    (1000 * 60 * 60 * 24 * 365)
                ).toFixed(1);

                const attendance =
                    await getEmployeeAttendance(
                        data.id
                    );

                const presentDays = attendance.filter(
                    (a: any) => a.status === "Present"
                ).length;

                const attendanceRate =
                    attendance.length > 0
                        ? Math.round(
                            (presentDays /
                                attendance.length) *
                            100
                        )
                        : 0;
                setProfile({
                    ...data,
                    department_name: departmentName,
                    years_of_service: years,
                    leave_balance: availableLeaves,
                    attendance_rate: attendanceRate,
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async (updated: Partial<ProfileData>) => {
        const userId = localStorage.getItem("userId");
        if (!userId || !profile) return;
        await updateEmployee(profile.id, updated);
        setProfile({ ...profile, ...updated });
    };


    const handlePasswordChange = async () => {
        try {
            if (newPassword !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const userId = localStorage.getItem("userId");

            if (!userId) return;

            await changePassword(
                Number(userId),
                currentPassword,
                newPassword
            );

            alert("Password updated successfully");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setPasswordOpen(false);
        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                "Failed to update password"
            );
        }
    };

    if (loading) {
        return (
            <div className="text-white flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                Loading profile…
            </div>
        );
    }

    if (!profile) {
        return <div className="text-slate-400">Could not load profile.</div>;
    }

    const initials = `${profile.first_name?.charAt(0) ?? ""}${profile.last_name?.charAt(0) ?? ""}`;
    const formattedDate = profile.joining_date
        ? new Date(profile.joining_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        : "—";

    return (
        <div className="text-white pt-5">
            {/* Page header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold">Profile</h1>
                    <p className="text-slate-400 mt-2">Manage your profile</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setEditOpen(true)}
                        className="mt-1 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium text-sm transition-all"
                    >
                        ✏️ Edit Profile
                    </button>

                    <button
                        onClick={() => setPasswordOpen(true)}
                        className="mt-1 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-medium text-sm transition-all"
                    >
                        🔒 Update Password
                    </button>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard
                    label="Years of service"
                    value={`${profile.years_of_service} Y`}
                    icon="🗓️"
                    color="bg-violet-500/20 text-violet-400"
                />
                <StatCard
                    label="Department"
                    value={profile.department_name ?? "—"}
                    icon="🏢"
                    color="bg-blue-500/20 text-blue-400"
                />
                <StatCard
                    label="Leave balance"
                    value={`${profile.leave_balance} days`}
                    icon="🌴"
                    color="bg-emerald-500/20 text-emerald-400"
                />
                <StatCard
                    label="Attendance rate"
                    value={`${profile.attendance_rate}%`}
                    icon="📊"
                    color="bg-amber-500/20 text-amber-400"
                />
            </div>

            {/* Main card */}
            <div className="mt-6 bg-slate-900 border border-slate-800 rounded-3xl p-8">
                {/* Identity row */}
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-3xl font-bold shrink-0 ring-4 ring-violet-500/20">
                        {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl font-bold truncate">
                            {profile.first_name} {profile.last_name}
                        </h2>
                        <p className="text-slate-400 mt-1">{profile.designation}</p>
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                            <span
                                className={`px-4 py-1 rounded-full ${profile.status === "Active"
                                    ? "bg-green-500/20 text-green-400"
                                    : profile.status === "Busy"
                                        ? "bg-yellow-500/20 text-yellow-400"
                                        : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                ● {profile.status}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-sm font-medium">
                                🏢 {profile.department_name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 mt-8 mb-8" />

                {/* Details grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { label: "Employee Code", value: profile.employee_code },
                        { label: "Employee ID", value: `#${profile.id}` },
                        { label: "Email", value: profile.email },
                        { label: "Phone", value: profile.phone },
                        { label: "Department", value: profile.department_name },
                        { label: "Joining Date", value: formattedDate },
                    ].map(({ label, value }) => (
                        <div key={label} className="group">
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">
                                {label}
                            </p>
                            <p className="text-white text-base font-medium">{value ?? "—"}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit modal */}
            {editOpen && (
                <EditModal
                    profile={profile}
                    onClose={() => setEditOpen(false)}
                    onSave={handleSave}
                />
            )}
            {passwordOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <h2 className="text-xl font-bold text-white mb-6">
                            Update Password
                        </h2>

                        <div className="space-y-4">

                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                            />

                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                            />

                        </div>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => setPasswordOpen(false)}
                                className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handlePasswordChange}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600"
                            >
                                Update Password
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
