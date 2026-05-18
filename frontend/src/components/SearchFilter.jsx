import { useState } from "react";

const SearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    department: "",
    name: "",
    email: "",
  });

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(filters);
  };

  return (
    <section className="rounded-[2rem] bg-white/95 p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-slate-900">
          Search & Filter
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Find team members by name, department, or email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3">
        <input
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Search by name"
          className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-500"
        />
        <input
          name="department"
          value={filters.department}
          onChange={handleChange}
          placeholder="Search by department"
          className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-500"
        />
        <input
          name="email"
          value={filters.email}
          onChange={handleChange}
          placeholder="Search by email"
          className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          className="sm:col-span-3 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Apply filters
        </button>
      </form>
    </section>
  );
};

export default SearchFilter;
