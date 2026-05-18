import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
} from "../api/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import SearchFilter from "../components/SearchFilter";

const Dashboard = ({ token }) => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  const loadEmployees = async () => {
    try {
      const response = await getEmployees(token);
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAddEmployee = async (data, setMessage) => {
    try {
      const response = await addEmployee(token, data);
      setEmployees((prev) => [response.data, ...prev]);
      setMessage("Employee created successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to save employee");
    }
  };

  const handleSearch = async (filters) => {
    try {
      const response = await searchEmployees(token, filters);
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (employee) => {
    const score = prompt(
      "Enter new performance score (0-100):",
      employee.performanceScore,
    );
    const parsed = Number(score);
    if (!score || Number.isNaN(parsed)) return;
    try {
      const response = await updateEmployee(token, employee._id, {
        performanceScore: parsed,
      });
      setEmployees((prev) =>
        prev.map((item) =>
          item._id === response.data._id ? response.data : item,
        ),
      );
      setMessage("Employee score updated");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await deleteEmployee(token, id);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      setMessage("Employee deleted successfully");
    } catch (err) {
      setMessage("Unable to delete employee");
    }
  };

  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const averageScore = totalEmployees
      ? (
          employees.reduce(
            (sum, employee) => sum + employee.performanceScore,
            0,
          ) / totalEmployees
        ).toFixed(1)
      : 0;
    const departments = new Set(
      employees
        .map((employee) => employee.department?.trim().toLowerCase())
        .filter(Boolean),
    ).size;

    return { totalEmployees, averageScore, departments };
  }, [employees]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Dashboard</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage employees, track performance, and launch AI-backed
              recommendations from one central workspace.
            </p>
          </div>
          <Link
            to="/recommendations"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            Open AI Recommendation Center
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-800/90 p-5 text-white ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Employees
            </p>
            <p className="mt-4 text-3xl font-semibold">
              {stats.totalEmployees}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-800/90 p-5 text-white ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Average Score
            </p>
            <p className="mt-4 text-3xl font-semibold">{stats.averageScore}</p>
          </div>
          <div className="rounded-3xl bg-slate-800/90 p-5 text-white ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Departments
            </p>
            <p className="mt-4 text-3xl font-semibold">{stats.departments}</p>
          </div>
        </div>
      </div>

      {message && (
        <div className="rounded-3xl bg-emerald-50 px-5 py-4 text-sm text-emerald-800 shadow-sm ring-1 ring-emerald-100">
          {message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <EmployeeForm token={token} onAdd={handleAddEmployee} />
          <SearchFilter onSearch={handleSearch} />
        </div>
        <EmployeeList
          employees={employees}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
