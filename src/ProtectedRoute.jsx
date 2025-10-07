// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute: Wrap any route element you want to protect.
 * It checks localStorage for "user" — change the check if you store auth differently.
 */
export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  // If not logged in, redirect to login page ("/")
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise render children (the protected page)
  return children;
}
