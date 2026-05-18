import { useState } from "react";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recommendations from "./pages/Recommendations";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleAuth = (authToken) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Employee Performance Analytics
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Smart HR dashboard with AI-powered recommendations
            </p>
          </div>

          {token ? (
            <nav className="flex flex-wrap items-center gap-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/recommendations"
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`
                }
              >
                Recommendations
              </NavLink>
              <button
                onClick={logout}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
              >
                Logout
              </button>
            </nav>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Routes>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onAuth={handleAuth} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              token ? (
                <Navigate to="/dashboard" />
              ) : (
                <Signup onAuth={handleAuth} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              token ? <Dashboard token={token} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/recommendations"
            element={
              token ? (
                <Recommendations token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/*"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
