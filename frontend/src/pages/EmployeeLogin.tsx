import { ArrowLeft, Eye, EyeOff, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function EmployeeLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const data = await login(email, password);

            console.log("LOGIN RESPONSE:", data);
            console.log("employeeId:", data.employeeId);

            localStorage.setItem(
                "token",
                data.access_token
            );

            localStorage.setItem(
                "userId",
                data.userId.toString()
            );

            if (data.employeeId) {
                localStorage.setItem(
                    "employeeId",
                    String(data.employeeId)
                );
            }

            localStorage.setItem(
                "email",
                data.email
            );


            navigate("/employee/dashboard");
        } catch (error) {
            console.error(error);
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden px-4 py-6">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[180px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[180px] rounded-full" />

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-6xl">
                <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

                    {/* LEFT SIDE */}
                    <div className="hidden lg:flex flex-col justify-center p-12 text-white">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                                <Users size={30} />
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">QuickEMS</h2>
                                <p className="text-slate-400">
                                    Workforce Management Platform
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex w-fit rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 mb-8">
                            Employee Access
                        </div>

                        <h1 className="text-5xl font-bold leading-tight">
                            Access Your Employee Portal
                        </h1>

                        <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                            View attendance, manage leave requests, update profile
                            information and access payroll details securely.
                        </p>

                        <div className="mt-10 space-y-3">
                            <div>✓ Attendance Records</div>
                            <div>✓ Leave Management</div>
                            <div>✓ Employee Profile</div>
                            <div>✓ Payroll & Payslips</div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center justify-center p-8 lg:p-14">
                        <div className="w-full max-w-md">

                            <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8">
                                <ArrowLeft size={18} />
                                Back to Portals
                            </button>

                            <div className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 mb-6">
                                Secure Employee Login
                            </div>

                            <h2 className="text-4xl font-bold text-white">
                                Welcome Back
                            </h2>

                            <p className="mt-3 text-slate-400">
                                Sign in to access your employee account.
                            </p>

                            <form onSubmit={handleLogin} className="mt-8 space-y-5">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">
                                        Employee Email
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="employee@quickems.com"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                                        />




                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 text-slate-400">
                                        <input type="checkbox" />
                                        Remember me
                                    </label>

                                    <button
                                        type="button"
                                        className="text-indigo-400 hover:text-indigo-300"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {error && (
                                    <p className="text-red-400 text-sm">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 hover:opacity-90 transition"
                                >
                                    {loading ? "Signing In..." : "Sign In"}
                                </button>
                            </form>

                            <p className="mt-8 text-center text-sm text-slate-500">
                                © 2026 QuickEMS. All rights reserved.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EmployeeLogin;