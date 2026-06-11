import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddEmployeeModal from "../components/AddEmployeeModal";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch,
} from "react-icons/fa";

function EmployeeList() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [searchParams] = useSearchParams();

    const departmentId = searchParams.get("department");

    const [departmentName, setDepartmentName] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data))
            .catch((err) => console.error(err));

        if (departmentId) {
            fetch(
                `http://localhost:3000/departments/${departmentId}`
            )
                .then((res) => res.json())
                .then((data) =>
                    setDepartmentName(
                        data.department_name
                    )
                )
                .catch((err) =>
                    console.error(err)
                );
        }
    }, [departmentId]);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `http://localhost:3000/employees/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setEmployees(
                employees.filter(
                    (employee) => employee.id !== id
                )
            );

            alert("Employee deleted successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to delete employee");
        }
    };

    const filteredEmployees = employees.filter(
        (employee) => {

            const matchesSearch =
                employee.first_name
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                employee.last_name
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                employee.email
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                employee.designation
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesDepartment =
                !departmentId ||
                employee.department_id ===
                Number(departmentId);

            return (
                matchesSearch &&
                matchesDepartment
            );
        }
    );

    return (
        <div className="text-white">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold">
                        {departmentName
                            ? `${departmentName} Employees`
                            : "Employees"}
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage your workforce efficiently
                    </p>

                    {departmentName && (
                        <button
                            onClick={() =>
                                window.location.href =
                                "/admin/employees"
                            }
                            className="text-indigo-400 mt-2 hover:text-indigo-300"
                        >
                            ← Back to All Employees
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium"
                >
                    <FaPlus />
                    Add Employee
                </button>
            </div>

            {/* Search + Stats */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">





                <div className="relative flex-1 max-w-xl">
                    <FaSearch className="absolute left-4 top-4 text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-3"
                    />
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                    <span>{filteredEmployees.length} Employees</span>
                    <span>•</span>
                    <span>
                        {
                            filteredEmployees.filter(
                                (e) => e.status === "Active"
                            ).length
                        } Active
                    </span>
                </div>



            </div>

            {/* Employee Cards */}
            <div className="grid gap-5">

                {filteredEmployees.map((employee) => (

                    <div
                        key={employee.id}
                        className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-5
              hover:border-indigo-500
              hover:shadow-lg
              hover:shadow-indigo-500/10
              transition-all">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            {/* Left Side */}
                            <div className="flex items-center gap-5">

                                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
                                    {employee.first_name?.charAt(0)}
                                    {employee.last_name?.charAt(0)}
                                </div>

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h2 className="text-xl font-bold">
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </h2>

                                        <span className="bg-indigo-600/20 text-indigo-400 text-xs px-3 py-1 rounded-full">
                                            {employee.employee_code}
                                        </span>

                                    </div>

                                    <p className="text-indigo-400 mt-1">
                                        {employee.designation}
                                    </p>

                                    <div className="flex flex-wrap gap-6 mt-3 text-sm text-slate-400">

                                        <span>
                                            📧 {employee.email}
                                        </span>

                                        <span>
                                            📱 {employee.phone}
                                        </span>

                                        <span>
                                            📅 {employee.joining_date}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-3">

                                <span
                                    className={`
                    px-3 py-1 rounded-full text-sm
                    ${employee.status === "Active"
                                            ? "bg-green-600/20 text-green-400"
                                            : "bg-red-600/20 text-red-400"
                                        }
                  `}
                                >
                                    {employee.status}
                                </span>

                                <button
                                    onClick={() => {
                                        setSelectedEmployee(employee);
                                        setShowModal(true);
                                    }}
                                    className="p-3 rounded-xl bg-slate-800 hover:bg-indigo-600 transition"
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    onClick={() => handleDelete(employee.id)}
                                    className="p-3 rounded-xl bg-slate-800 hover:bg-red-600 transition"
                                >
                                    <FaTrash />
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>
            <AddEmployeeModal
                isOpen={showModal}
                employee={selectedEmployee}
                onClose={() => {
                    setShowModal(false);
                    setSelectedEmployee(null);
                }}
                onSuccess={() => {
                    setShowModal(false);
                    setSelectedEmployee(null);

                    fetch("http://localhost:3000/employees")
                        .then((res) => res.json())
                        .then((data) => setEmployees(data));
                }}
            />
        </div>
    );
}

export default EmployeeList;