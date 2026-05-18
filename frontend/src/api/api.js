import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const defaultClient = (token) =>
  axios.create({
    baseURL: API_BASE,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

export const signup = (payload) =>
  axios.post(`${API_BASE}/auth/register`, payload);
export const login = (payload) => axios.post(`${API_BASE}/auth/login`, payload);
export const getEmployees = (token) => defaultClient(token).get("/employees");
export const searchEmployees = (token, query) =>
  defaultClient(token).get("/employees/search", { params: query });
export const addEmployee = (token, payload) =>
  defaultClient(token).post("/employees", payload);
export const updateEmployee = (token, id, payload) =>
  defaultClient(token).put(`/employees/${id}`, payload);
export const deleteEmployee = (token, id) =>
  defaultClient(token).delete(`/employees/${id}`);
export const generateRecommendation = (
  token,
  summary,
  recommendationType,
  useSavedEmployees,
) =>
  defaultClient(token).post("/ai/recommend", {
    summary,
    recommendationType,
    useSavedEmployees,
  });
