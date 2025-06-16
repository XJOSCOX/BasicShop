import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Login from "./pages/Login";
import RequireAuth from "./utils/RequireAuth";

function AppLayout() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Only show layout if logged in and has correct role
  const showLayout = user && ["admin", "manager"].includes(user.role);

  return (
    <div className="app-layout">
      {showLayout && <Sidebar />}
      <div className="main-content" style={{ marginLeft: showLayout ? "240px" : "0" }}>
        {showLayout && <Header />}
        <div className="page-content">
          <Routes>
            <Route
              path="/login"
              element={
                user && ["admin", "manager"].includes(user.role) ? (
                  <Navigate to="/" />
                ) : (
                  <Login />
                )
              }
            />

            <Route
              path="/"
              element={
                <RequireAuth allowedRoles={["admin", "manager"]}>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/products"
              element={
                <RequireAuth allowedRoles={["admin", "manager"]}>
                  <Products />
                </RequireAuth>
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
