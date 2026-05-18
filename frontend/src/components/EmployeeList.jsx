const EmployeeList = ({ employees, onUpdate, onDelete }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="rounded-[2rem] bg-white/95 p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
        No employees found.
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white/95 p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Employee List
          </h3>
          <p className="text-sm text-slate-500">
            Manage every team member from a single list.
          </p>
        </div>
        <span className="text-sm text-slate-500">Total {employees.length}</span>
      </div>

      <div className="mt-6 space-y-4">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  {employee.name}
                </h4>
                <p className="mt-1 text-sm text-slate-500">
                  {employee.email} • {employee.department}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Score: {employee.performanceScore}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Experience: {employee.experience} yrs
                </span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1.5fr_0.8fr]">
              <div>
                <strong className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Skills
                </strong>
                <p className="mt-2 text-sm text-slate-700">
                  {employee.skills.join(", ") || "None"}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <button
                  onClick={() => onUpdate(employee)}
                  className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Update Score
                </button>
                <button
                  onClick={() => onDelete(employee._id)}
                  className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployeeList;
