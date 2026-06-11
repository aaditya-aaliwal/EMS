import { useEffect, useState } from "react";
import { getDepartments, createDepartment, deleteDepartment, updateDepartment } from "../api/departments";
import { useNavigate } from "react-router-dom";

function Departments() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

    const [departmentName, setDepartmentName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<any[]>([]);

    useEffect(() => {
        fetchDepartments();

        fetch("http://localhost:3000/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data))
            .catch((err) => console.error(err));
    }, []);

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDepartment = async () => {
        try {
            if (!departmentName.trim()) {
                alert("Department name is required");
                return;
            }

            if (selectedDepartment) {
                await updateDepartment(
                    selectedDepartment.id,
                    {
                        department_name: departmentName,
                        description,
                    }
                );
            } else {
                await createDepartment({
                    department_name: departmentName,
                    description,
                });
            }


            setDepartmentName("");
            setDescription("");
            setSelectedDepartment(null);
            setShowModal(false);

            fetchDepartments();
        } catch (error) {
            console.error(error);
            alert("Failed to create department");
        }
    };

    const handleDeleteDepartment = async (
        id: number,
        departmentName: string
    ) => {
        const confirmDelete = window.confirm(
            `Delete ${departmentName}?`
        );

        if (!confirmDelete) return;

        try {
            await deleteDepartment(id);

            fetchDepartments();

            alert("Department deleted successfully");
        } catch (error) {
            console.error(error);

            alert("Cannot delete department. Employees are assigned to this department.");
        }
    };

    const filteredDepartments = departments.filter((dept) =>
        dept.department_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const getEmployeeCount = (
        departmentId: number
    ) => {
        return employees.filter(
            (emp) =>
                emp.department_id === departmentId
        ).length;
    };

    return (
        <div className="text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold">
                        Departments
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage company departments
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="
    px-6
    py-3
    rounded-xl
    bg-gradient-to-r
    from-violet-600
    to-indigo-600
    hover:opacity-90
    transition
    font-medium
    "
                >
                    + Add Department
                </button>
            </div>

            <div className="mt-8">
                <input
                    type="text"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    "
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {filteredDepartments.map((dept) => (
                    <div
                        key={dept.id}
                        className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-2xl
                        p-6
                        "
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                {dept.department_name}
                            </h3>

                            <span
                                className="
                                px-3
                                py-1
                                rounded-full
                                bg-violet-500/20
                                text-violet-300
                                text-sm"
                            >
                                {getEmployeeCount(dept.id)} Employees
                            </span>
                        </div>


                        <p className="text-slate-400 mt-2">
                            {dept.description ||
                                "No description"}
                        </p>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/admin/employees?department=${dept.id}`
                                    )
                                }
                                className="px-4 py-2 rounded-lg bg-indigo-600"
                            >
                                View Employees
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedDepartment(dept);
                                    setDepartmentName(
                                        dept.department_name
                                    );
                                    setDescription(
                                        dept.description || ""
                                    );
                                    setShowModal(true);
                                }}
                                className="px-4 py-2 rounded-lg bg-amber-500"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDeleteDepartment(
                                        dept.id,
                                        dept.department_name
                                    )
                                }
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!loading &&
                filteredDepartments.length === 0 && (
                    <div className="text-slate-500 mt-10">
                        No departments found.
                    </div>
                )}

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-2">
                            {selectedDepartment
                                ? "Edit Department"
                                : "Add Department"}
                        </h2>

                        <p className="text-slate-400 mb-6">
                            {selectedDepartment
                                ? "Update department details"
                                : "Create a new department"}
                        </p>

                        <div className="space-y-5">

                            <div>
                                <label className="block text-sm mb-2 text-slate-300">
                                    Department Name
                                </label>

                                <input
                                    type="text"
                                    value={departmentName}
                                    onChange={(e) =>
                                        setDepartmentName(e.target.value)
                                    }
                                    placeholder="Enter department name"
                                    className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            text-white
            outline-none
            "
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-slate-300">
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    rows={4}
                                    placeholder="Enter description"
                                    className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            text-white
            outline-none
            "
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="
            px-5
            py-3
            rounded-xl
            bg-slate-700
            "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleCreateDepartment}
                                    className="
        px-6
        py-3
        bg-gradient-to-r
        from-violet-600
        to-indigo-600
        hover:from-violet-700
        hover:to-indigo-700
        text-white
        font-semibold
        rounded-xl
        shadow-lg
        shadow-indigo-500/20
        transition-all
    "
                                >
                                    {selectedDepartment
                                        ? "Update Department"
                                        : "Save Department"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Departments;