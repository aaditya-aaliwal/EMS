import { useEffect, useState } from "react";
import { getUserById } from "../api/users";
import { changePassword } from "../api/auth";

function AdminProfile() {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const data = await getUserById(Number(userId));

        setAdmin(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill all fields");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const userId = Number(
        localStorage.getItem("userId")
      );

      const response = await changePassword(
        userId,
        currentPassword,
        newPassword
      );

      alert(response.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowPasswordModal(false);
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
        "Failed to update password"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Admin Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your account information
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 flex items-center gap-5 border-b border-slate-800">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold">
            {admin.username?.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-2xl font-semibold mt-4">
            {admin.username}
          </h2>

          <span className="mt-2 px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 text-sm">
            {admin.role_id === 1
              ? "Administrator"
              : "Employee"}
          </span>
        </div>

        {/* Details */}
        <div className="p-5 space-y-4">
          <div>
            <p className="text-slate-400 text-sm">
              Username
            </p>
            <p className="text-white text-lg mt-1">
              {admin.username}
            </p>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <p className="text-slate-400 text-sm">
              Email
            </p>
            <p className="text-white text-lg mt-1">
              {admin.email}
            </p>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <p className="text-slate-400 text-sm">
              Role
            </p>
            <p className="text-white text-lg mt-1">
              {admin.role_id === 1
                ? "Administrator"
                : "Employee"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Password & Security
            </h3>

            <p className="text-slate-400 mt-1">
              Update your account password to keep your account secure.
            </p>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition"
          >
            Change Password
          </button>
        </div>

        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Change Password
              </h2>

              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-slate-700 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>


  );
}

export default AdminProfile;