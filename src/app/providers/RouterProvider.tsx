import { Routes, Route, Navigate } from "react-router";
import Dashboard from "../../pages/Dashboard";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import { ProtectedRoute } from "../../components/ProtectedRoute";

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
      />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}