import { ArrowRight, Building2, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden px-6 py-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[180px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_40%)]" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] min-h-screen lg:min-h-[85vh] lg:max-h-[850px]">
          {/* LEFT SIDE */}
          <div className="relative flex flex-col justify-center p-6 md:p-8 lg:p-12 text-white text-center lg:text-left">
            <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                  <ShieldCheck size={30} />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">QuickEMS</h2>
                  <p className="text-slate-400">
                    Workforce Management Platform
                  </p>
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center self-center lg:self-start rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 mb-6">
                Enterprise HR Platform
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1]">
                Manage Your Workforce Smarter
              </h1>

              {/* Description */}
              <p className="mt-4 text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Streamline employee operations, attendance tracking,
                leave management and payroll processing from one
                powerful platform.
              </p>

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0">
                {[
                  "Employee Management",
                  "Attendance Tracking",
                  "Leave Management",
                  "Payroll Processing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span className="text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center bg-white/[0.03] p-6 md:p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 mb-6">
                Secure Access Portal
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="mt-3 text-slate-400 text-lg">
                Choose your portal to continue.
              </p>

              {/* Cards */}
              <div className="mt-10 space-y-5">
                {/* Admin */}
                <button
                  onClick={() => navigate("/login/admin")} className="group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400 hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10">
                        <Building2
                          size={26}
                          className="text-indigo-300"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Admin Portal
                        </h3>

                        <p className="mt-1 text-slate-400">
                          Manage employees, departments and payroll.
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="text-slate-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>

                {/* Employee */}
                <button
                  onClick={() => navigate("/login/employee")}
                  className="group w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400 hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10">
                        <Users
                          size={26}
                          className="text-indigo-300"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Employee Portal
                        </h3>

                        <p className="mt-1 text-slate-400">
                          Access attendance, leave and profile.
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="text-slate-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </div>

              {/* Footer */}
              <p className="mt-8 text-sm text-slate-500 text-center">
                © 2026 QuickEMS. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

