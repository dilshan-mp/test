import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Router from "../router/router";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/ui/navbar";
import StarsCanvas from "../components/common/StarBackground";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // to render the alternative Navbar or the default Navbar
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex-1 relative h-screen flex flex-col">
      <StarsCanvas />
      {!hideNavbar && <Navbar />}
      <div className="flex flex-col md:flex-row justify-center flex-1">
        <Router />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default Layout;
