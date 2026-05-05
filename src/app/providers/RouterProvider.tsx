import { Routes, Route, Navigate } from "react-router";
import Dashboard from "../../pages/Dashboard";
import Login from "../../components/auth/Login";
import Signup from "../../components/auth/Signup";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import NotFound from "../../pages/NotFound";
import Home from "../../components/dashboard/pages/Home";
import Monitoring from "../../components/dashboard/pages/Monitoring";
import MainGrid from "../../components/dashboard/mainGrid/MainGrid";

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
        <Route index element={<MainGrid />} />
        <Route path="monitoring" element={<Monitoring />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}