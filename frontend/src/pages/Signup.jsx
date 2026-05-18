import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/api";

const Signup = ({ onAuth }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await signup(form);
      onAuth(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-112px)] items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-[2rem] bg-slate-950/95 p-8 shadow-2xl shadow-slate-900 ring-1 ring-slate-700">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-600 to-cyan-400 p-6 text-white shadow-lg">
          <h2 className="text-3xl font-semibold">Create your account</h2>
          <p className="mt-2 text-sm text-slate-100">
            Get started with employee performance analytics and AI-driven
            insights.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
              placeholder="Choose a secure password"
            />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered?{" "}
          <Link
            className="font-semibold text-cyan-300 hover:text-cyan-200"
            to="/login"
          >
            Login
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Signup;
