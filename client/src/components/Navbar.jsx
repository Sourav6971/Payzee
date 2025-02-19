import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../assets/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const NavbarItem = ({ title, classProps }) => {
    return (
      <li
        className={`m-4 cursor-pointer ${classProps}`}
        onClick={() => {
          navigate(`/${title}`);
        }}
      >
        {title}
      </li>
    );
  };

  return (
    <nav className="w-full flex md:justify-center justify-between text-center p-4">
      <div className="md:flex-[0.5] flex-col flex-initial justify-center items-center">
        <div className="flex items-center">
          <span className="ml-3 mt-2 text-white text-3xl font-stretch-semi-expanded ">
            {" "}
            Payzee!
          </span>
        </div>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {
          /* {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
          return <NavbarItem key={item + index} title={item} />;
        })} */
          //The above line can also be written without the return statement as:
          ["Home", "Market", "Tutorials", "Wallets"].map((item, index) => (
            <NavbarItem key={item + index} title={item} />
          ))
        }
        <li
          className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
          onClick={() => navigate("/auth")}
        >
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="
            text-white
            md:hidden
            cursor-pointer"
            onClick={() => {
              setToggleMenu(false);
            }}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="
            text-white
            md:hidden
            cursor-pointer"
            onClick={() => {
              setToggleMenu(true);
            }}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animation-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                onClick={() => {
                  setToggleMenu(false);
                }}
              />
            </li>
            <li>
              {["Home", "Market", "Tutorials", "Wallets"].map((item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="m-2 text-lg"
                />
              ))}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
