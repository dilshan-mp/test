import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { BackgroundBoxesDemo } from "../components/common/color-box";
import { AuthContext } from "../context/authContext";
import AstronomyImage from "../pages/astromonyImage";
import Earth from "../pages/earth";
import Epic from "../pages/epic";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ResetPassword from "../pages/resetPassword";
import TestPage from "../pages/testPage";

const Router = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/backgroundBoxesDemo" element={<BackgroundBoxesDemo />} />
      <Route path="/test-page" element={<TestPage />} />

      <Route
        path="/earth"
        element={
          <ProtectedRoute>
            <Earth />
          </ProtectedRoute>
        }
      />

      <Route
        path="/epic"
        element={
          <ProtectedRoute>
            <Epic />
          </ProtectedRoute>
        }
      />

      <Route
        path="/picture-of-the-day"
        element={
          <ProtectedRoute>
            <AstronomyImage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/earth"
        element={
          <ProtectedRoute>
            <Earth />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
