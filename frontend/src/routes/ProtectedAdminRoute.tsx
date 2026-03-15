import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }: any) {
  const token = localStorage.getItem("adminToken");

  // ❌ Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}