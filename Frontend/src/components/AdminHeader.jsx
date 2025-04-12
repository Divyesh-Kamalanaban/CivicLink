/* eslint-disable no-unused-vars */
import React from "react";
import { useAuthContext } from "../context/authContext";
import useLogout from "../hooks/useLogout";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
function AdminHeader() {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const nav = useNavigate();

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => nav("/dashboard")}>
          Civic Link <span className="text-xl text-red-700">ADMIN</span>
        </a>
      </div>
      <div className="flex-none gap-2">
        <button
          className="text-red-700 "
          onClick={() => nav("/dashboard/users")}
        >
          Users
        </button>
        <button
          className="text-red-700 "
          onClick={() => nav("/dashboard/approve-work")}
        >
          approve-work
        </button>
        <button
          className="text-red-700 "
          onClick={() => nav("/dashboard/approve-posts")}
        >
          approve-posts
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button className="text-red-700 " onClick={() => logout()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
