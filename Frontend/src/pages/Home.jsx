import React from "react";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default Home;
