import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api";

const Login = ({ onAuth }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await login(form);
      onAuth(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-112px)] items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-[2rem] bg-slate-950/95 p-8 shadow-2xl shadow-slate-900 ring-1 ring-slate-700">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 to-slate-900 p-6 text-white shadow-lg">
          <h2 className="text-3xl font-semibold">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-200">
            Sign in to manage employee performance and AI recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link
            className="font-semibold text-cyan-300 hover:text-cyan-200"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
