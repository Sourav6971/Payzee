import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("Login");
  const navItems = ["Home", "Dashboard", "Payments"];
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn("Logout");
  }, [isLoggedIn]);

  const NavbarItem = ({ title }) => {
    return (
      <li
        className="m-4 cursor-pointer  transition duration-300 text-black "
        onClick={() => {
          if (title == "Home") navigate("/");
          else navigate(`/${title}`);
        }}
      >
        {title}
      </li>
    );
  };

  return (
    <div className="w-full shadow ">
      <div className="w-full max-w-[1800px]  mx-auto top-0 left-0 z-50    flex  justify-between text-center p-4">
        <div className="md:flex-[0.5] flex-col flex-initial justify-center items-center">
          <div className="flex items-center">
            <span className="ml-3 mt-2 text-black text-3xl font-semibold">
              Payzee!
            </span>
          </div>
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {navItems.map((item, index) => (
            <NavbarItem key={item + index} title={item} />
          ))}
          <li
            className="bg-[#38BDF8] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#1E90FF] 
                     transition duration-300 shadow-md text-black"
            onClick={() => {
              if (isLoggedIn === "Logout") {
                localStorage.removeItem("token");
                setIsLoggedIn("Login");
                navigate("/Dashboard");
              } else {
                navigate("/Auth");
              }
            }}
          >
            {isLoggedIn}
          </li>
        </ul>
        <div className="flex relative md:hidden items-center">
          <div
            className="bg-[#38BDF8] py-2 px-7 rounded-full cursor-pointer hover:bg-[#1E90FF] 
                      transition duration-300 shadow-md"
            onClick={() => {
              if (isLoggedIn === "Logout") {
                localStorage.removeItem("token");
                setIsLoggedIn("Login");
                navigate("/Dashboard");
              } else {
                navigate("/Auth");
              }
            }}
          >
            {isLoggedIn}
          </div>
          {toggleMenu ? (
            <AiOutlineClose
              fontSize={28}
              className="text-white cursor-pointer ml-4" // Adjusted positioning
              onClick={() => {
                setToggleMenu(false);
              }}
            />
          ) : (
            <HiMenuAlt4
              fontSize={28}
              className="text-white cursor-pointer ml-4" // Adjusted positioning
              onClick={() => {
                setToggleMenu(true);
              }}
            />
          )}
        </div>
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                     flex flex-col justify-start items-end rounded-md bg-gradient-to-b from-[#141E30] to-[#243B55] text-white"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                onClick={() => {
                  setToggleMenu(false);
                }}
              />
            </li>
            {navItems.map((item, index) => (
              <NavbarItem
                key={item + index}
                title={item}
                classProps="m-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
