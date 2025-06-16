import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles, children }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();

    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RequireAuth;
