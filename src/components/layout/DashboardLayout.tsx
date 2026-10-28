// src/components/layout/DashboardLayout.jsx
import { Navigate, Outlet } from "react-router";
import Sidebar from "./Sidebar";
import type React from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../Utils/Loading";

const DashboardLayout: React.FC = () => {
  const { user, loading } = useAuth() as any;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar  */}
      <Sidebar />

      {/* main area */}
      <div className="flex-1 p-6 overflow-auto bg-primary">
        <div className="min-h-full rounded-lg p-5 space-y-5 shadow-2xl ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
