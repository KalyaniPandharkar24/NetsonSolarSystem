import { Routes, Route, Navigate } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */

import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";
import ServicesPage from "./pages/ServicesPage";
import Projects from "./pages/Projects";

import MainLayout from "./components/layout/MainLayout";

/* ================= ADMIN PAGES ================= */

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminResetPassword from "./pages/admin/AdminResetPassword";

import AdminLayout from "./components/admin/AdminLayout";

/* ================= PROTECTED ROUTE ================= */

const AdminRoute = ({ children }: any) => {
  const token = localStorage.getItem("adminToken");

  if (!token) return <Navigate to="/admin/login" replace />;

  return children;
};

function App() {
  return (
    <Routes>

      {/* ================================================= */}
      {/* ================= PUBLIC ROUTES ================= */}
      {/* ================================================= */}

      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/services"
        element={
          <MainLayout>
            <ServicesPage />
          </MainLayout>
        }
      />

      <Route
        path="/projects"
        element={
          <MainLayout>
            <Projects />
          </MainLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        }
      />

      {/* Quick action routes */}
      <Route path="/get-quote" element={<Navigate to="/?quote=1" replace />} />
      <Route path="/get-visit" element={<Navigate to="/?visit=1" replace />} />
      <Route path="/get-call" element={<Navigate to="/contact?callback=1" replace />} />

      {/* ================================================= */}
      {/* ================= ADMIN PUBLIC ================== */}
      {/* ================================================= */}

      {/* 🔐 Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 🔐 Forgot Password */}
      <Route
        path="/admin/forgot-password"
        element={<AdminForgotPassword />}
      />

      {/* 🔐 Reset Password (PUBLIC — IMPORTANT) */}
      <Route
        path="/admin/reset-password/:token"
        element={<AdminResetPassword />}
      />

      {/* ================================================= */}
      {/* ============== PROTECTED ADMIN AREA ============== */}
      {/* ================================================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<AdminDashboard />} />

        {/* Reviews */}
        <Route path="reviews" element={<AdminReviews />} />

        {/* Contact CRM */}
        <Route path="contacts" element={<AdminContacts />} />

        {/* Unknown admin routes → dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* ================================================= */}
      {/* ================= GLOBAL FALLBACK =============== */}
      {/* ================================================= */}

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
