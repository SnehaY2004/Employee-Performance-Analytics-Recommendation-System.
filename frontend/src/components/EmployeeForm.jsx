import { useState } from "react";

const EmployeeForm = ({ token, onAdd }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const skills = employee.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    onAdd(
      {
        ...employee,
        skills,
        performanceScore: Number(employee.performanceScore),
        experience: Number(employee.experience),
      },
      setMessage,
    );
  };

  return (
    <section className="rounded-[2rem] bg-white/95 p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-slate-900">Add Employee</h3>
        <p className="mt-2 text-sm text-slate-500">
          Capture employee details, skills, and performance metrics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Name</span>
            <input
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <input
              name="email"
              value={employee.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Department</span>
            <input
              name="department"
              value={employee.department}
              onChange={handleChange}
              placeholder="Department"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Score</span>
            <input
              name="performanceScore"
              value={employee.performanceScore}
              onChange={handleChange}
              type="number"
              placeholder="Score"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Experience</span>
            <input
              name="experience"
              value={employee.experience}
              onChange={handleChange}
              type="number"
              placeholder="Experience"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-600">
          <span>Skills</span>
          <textarea
            name="skills"
            value={employee.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            rows="3"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save Employee
          </button>
          {message && <span className="text-sm text-slate-500">{message}</span>}
        </div>
      </form>
    </section>
  );
};

export default EmployeeForm;
