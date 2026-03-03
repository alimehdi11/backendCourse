import React, { useState } from "react";
import Books from "./pages/book/Books";
import { Routes, Route, Navigate } from "react-router-dom";
import BookForm from "./pages/book/BookForm";
import Navbar from "./components/Navbar";
import Students from "./pages/student/Students";
import StudentForm from "./pages/student/StudentForm";
import AuthForm from "./pages/AuthForm";
import { useAuth } from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import ConfirmModal from "./components/ConfirmModal";
import SideBar from "./components/sideBar";
import TopBar from "./components/TopBar";
import { logoutUser } from "./features/users/userSlice";
import { toast } from "react-toastify";
import Dashboard from "./components/Dashboard";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const App = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    setIsLogoutModalOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      {!isAuthenticated && <Navbar />}
      <div className="flex">
        {isAuthenticated && (
          <SideBar
            sidebarCollapsed={sidebarCollapsed}
            toggleSidebar={toggleSidebar}
            onLogoutClick={() => setIsLogoutModalOpen(true)}
          />
        )}
        <div className="flex-1">
          {isAuthenticated && (
            <TopBar onLogoutClick={() => setIsLogoutModalOpen(true)} />
          )}
          <div
            className={`flex-1 ${sidebarCollapsed && isAuthenticated ? "ml-5" : ""}`}>
            <Routes>
              {/* Books routes */}
              <Route
                path="/books"
                element={
                  <ProtectedRoute>
                    <Books />
                  </ProtectedRoute>
                }
              >
                <Route path="create" element={<BookForm />} />
                <Route path="edit/:id" element={<BookForm />} />
              </Route>

              {/* Students routes */}
              <Route
                path="/students"
                element={
                  <ProtectedRoute>
                    <Students />
                  </ProtectedRoute>
                }
              >
                <Route path="create" element={<StudentForm />} />
                <Route path="edit/:id" element={<StudentForm />} />
              </Route>

              {/* Auth routes */}
              <Route
                path="/auth/:type"
                element={
                  <PublicRoute>
                    <AuthForm />
                  </PublicRoute>
                }
              />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <ConfirmModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
          title="Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default App;
