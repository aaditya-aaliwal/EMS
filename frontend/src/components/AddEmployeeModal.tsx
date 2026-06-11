import { useState, useEffect } from "react";
import { getDepartments } from "../api/departments";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    employee?: any;
};

function AddEmployeeModal({
    isOpen,
    onClose,
    onSuccess,
    employee,
}: Props) {
    const [loading, setLoading] = useState(false);

    const isEdit = !!employee;
    console.log("Employee Data:", employee);
console.log("isEdit:", isEdit);
    const [departments, setDepartments] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        designation: "",
        department_id: "1",
        joining_date: "",
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                first_name: employee.first_name || "",
                last_name: employee.last_name || "",
                email: employee.email || "",
                phone: employee.phone || "",
                username: "",
                password: "",
                designation: employee.designation || "",
                department_id:
                    employee.department_id?.toString() || "1",
                joining_date:
                    employee.joining_date?.split("T")[0] || "",
            });
        }
    }, [employee]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (isEdit) {
                const response = await fetch(
                    `http://localhost:3000/employees/${employee.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            first_name: formData.first_name,
                            last_name: formData.last_name,
                            email: formData.email,
                            phone: formData.phone,
                            designation: formData.designation,
                            department_id: Number(
                                formData.department_id
                            ),
                            joining_date:
                                formData.joining_date,
                            status: "Active",
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to update employee"
                    );
                }

                alert("Employee updated successfully");

                onSuccess();
                onClose();
                return;
            }

            const employeeCode =
                "EMP" +
                Date.now().toString().slice(-4);

            const registerResponse = await fetch(
                "http://localhost:3000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                        role_id: 2,
                    }),
                }
            );

            if (!registerResponse.ok) {
                throw new Error("Failed to create user");
            }

            const createdUser = await registerResponse.json();

            const response = await fetch(
                "http://localhost:3000/employees",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        user_id: createdUser.id,
                        employee_code: employeeCode,
                        first_name:
                            formData.first_name,
                        last_name:
                            formData.last_name,
                        email: formData.email,
                        phone: formData.phone,
                        designation:
                            formData.designation,
                        department_id: Number(
                            formData.department_id
                        ),
                        joining_date:
                            formData.joining_date,
                        status: "Active",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to create employee"
                );
            }

            alert("Employee added successfully");

            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                username: "",
                password: "",
                designation: "",
                department_id: "1",
                joining_date: "",
            });

            onSuccess();
            onClose();

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl p-8">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Add Employee
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Create a new employee
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="block mb-2 text-slate-300">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="first_name"
                                value={
                                    formData.first_name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="last_name"
                                value={
                                    formData.last_name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={
                                    handleChange
                                }
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={
                                    handleChange
                                }
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Designation
                            </label>

                            <input
                                type="text"
                                name="designation"
                                value={
                                    formData.designation
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Department
                            </label>

                            <select
                                name="department_id"
                                value={
                                    formData.department_id
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            >
                                <option value="">
                                    Select Department
                                </option>

                                {departments.map((dept) => (
                                    <option
                                        key={dept.id}
                                        value={dept.id}
                                    >
                                        {dept.department_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-300">
                                Joining Date
                            </label>

                            <input
                                type="date"
                                name="joining_date"
                                value={
                                    formData.joining_date
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployeeModal;