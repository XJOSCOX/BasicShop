import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductCreate from "./pages/ProductCreate"; // ✅ Include Create Page
import Login from "./pages/Login";
import RequireAuth from "./utils/RequireAuth";
import "./App.css";

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);

  const showLayout = user && ["admin", "manager"].includes(user.role);

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("user");
      setShowWarning(false);
      navigate("/login");
    };

    const resetTimer = () => {
      setShowWarning(false);
      clearTimeout(timeoutRef.current);
      clearTimeout(warningTimeoutRef.current);

      timeoutRef.current = setTimeout(logout, 30 * 60 * 1000); // 30 mins
      warningTimeoutRef.current = setTimeout(() => {
        setShowWarning(true);
      }, 29 * 60 * 1000); // 29 mins warning
    };

    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutRef.current);
      clearTimeout(warningTimeoutRef.current);
    };
  }, [navigate]);

  return (
    <>
      {showWarning && (
        <div className="auto-logout-warning">
          <div className="warning-box">
            <p>You will be logged out due to inactivity in 1 minute.</p>
            <button onClick={() => setShowWarning(false)}>Dismiss</button>
          </div>
        </div>
      )}

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
              <Route
                path="/products/create"
                element={
                  <RequireAuth allowedRoles={["admin", "manager"]}>
                    <ProductCreate />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
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
