import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
function Dashboard() {
  return (
    <div className="w-full h-full">
      <AdminHeader />
      <Outlet />
    </div>
  );
}

export default Dashboard;
