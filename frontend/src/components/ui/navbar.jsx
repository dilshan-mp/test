import {
  Button,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  Activity,
  ChevronDown,
  Flash,
  Lock,
  LogoutIcon,
  Scale,
  Server,
  TagUser,
} from "../../assets/icons/incons";
import { AuthContext } from "../../context/authContext";

const MyNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  console.log(user);
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };
  return (
    <Navbar
      isBlurred
      isBordered
      shouldHideOnScroll
      maxWidth="full"
      position="sticky"
    >
      <NavbarBrand>
        <Image width={40} height={40} src="./logo.png" />
        <p className="ml-2 text-xl font-bold text-inherit">
          Space
          <span className="font-[800] bg-clip-text  text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
            LAB
          </span>
        </p>
      </NavbarBrand>

      {user && (
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem isActive={pathname == "/"}>
            <Link
              color={pathname == "/" ? "primary" : "foreground"}
              onClick={() => navigate("/")}
              className="cursor-pointer"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname == "/picture-of-the-day"}>
            <Link
              color={
                pathname == "/picture-of-the-day" ? "primary" : "foreground"
              }
              onClick={() => navigate("/picture-of-the-day")}
              className="cursor-pointer"
            >
              APOD
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname == "/earth"}>
            <Link
              color={pathname == "/earth" ? "primary" : "foreground"}
              onClick={() => navigate("/earth")}
              aria-current="page"
              className="cursor-pointer"
            >
              EARTH
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname == "/epic"}>
            <Link
              color={pathname == "/epic" ? "primary" : "foreground"}
              onClick={() => navigate("/epic")}
              aria-current="page"
              className="cursor-pointer"
            >
              MARS
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      {!user ? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="/login" className="font-bold">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              className="font-bold"
              href="#"
              variant="flat"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button
              color="default"
              variant="faded"
              className="font-bold"
              onClick={logout}
              endContent={<LogoutIcon />}
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default MyNavbar;
