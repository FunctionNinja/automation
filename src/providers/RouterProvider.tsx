import { Routes, Route, Navigate } from "react-router";
import Dashboard from "../pages/Dashboard";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { ProtectedRoute } from "./protectedRoutes/ProtectedRoute";
import AdminProtectedRoute  from "./protectedRoutes/AdminProtectedRoute";
import NotFound from "../pages/NotFound";
import Monitoring from "../pages/Monitoring";
import Home from "../pages/Home";
import Employees from "../pages/Employees";
import Admin from "../pages/Admin";
// import MainGrid from "../components/dashboard/mainGrid/MainGrid";

export const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="monitoring" element={<Monitoring />} />
        <Route path="employees" element={<Employees />} />
        <Route path="admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}