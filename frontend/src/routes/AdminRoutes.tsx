import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;