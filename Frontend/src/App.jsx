/* eslint-disable no-unused-vars */
import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/authContext";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import PostForm from "./components/PostForm";
import Dashboard from "./pages/Dashboard";
import ApprovePosts from "./pages/ApprovePosts";
import ViewUnverifiedPost from "./pages/ViewUnverifiedPost";
import ViewPost from "./pages/ViewPost";
import SubmitWork from "./pages/SubmitWork";
import ApproveWork from "./pages/ApproveWork";
import CSRDashboard from "./pages/CSRDashboard";
import { AuthContextProvider } from "./context/authContext";
import { PostContextProvider } from "./context/postContext";
import { WorkContextProvider } from "./context/workContext";
import { CSRContextProvider } from "./context/csrContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <WorkContextProvider>
          <CSRContextProvider>
            <div className="flex justify-center items-center">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route
                  path="/login"
                  element={
                    authUser?.name == "admin" ? (
                      <Navigate to="/dashboard" />
                    ) : authUser ? (
                      <Navigate to="/home" />
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route
                  path="/signup"
                  element={
                    authUser?.name == "admin" ? (
                      <Navigate to="/dashboard" />
                    ) : authUser ? (
                      <Navigate to="/home" />
                    ) : (
                      <Signup />
                    )
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    authUser?.name == "admin" ? <Dashboard /> : <Navigate to="/home" />
                  }
                >
                  <Route path="/dashboard/users" element={<h1>manage users to be implemented</h1>} />
                  <Route path="/dashboard/approve-posts" element={<ApprovePosts />} />
                  <Route path="/dashboard/approve-work" element={<ApproveWork />} />
                  <Route path="/dashboard/view-post" element={<ViewUnverifiedPost />} />
                </Route>
                <Route
                  path="/home"
                  element={authUser ? <Home /> : <Navigate to="/login" />}
                >
                  <Route path="/home/post" element={<PostForm />} />
                  <Route path="/home/profile" element={<Profile />} />
                  <Route path="/home/view-post" element={<ViewPost />} />
                  <Route path="/home/submit-work" element={<SubmitWork />} />
                  <Route path="/home" element={<Feed />} />
                </Route>
                <Route
                  path="/csr-dashboard"
                  element={authUser ? <CSRDashboard /> : <Navigate to="/login" />}
                />
              </Routes>
            </div>
          </CSRContextProvider>
        </WorkContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
