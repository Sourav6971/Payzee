import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { FaEyeSlash } from "react-icons/fa";
import { Input } from "../components/ui/Index";
import { AiFillEye } from "react-icons/ai";
import { UserContext } from "../context/user/context";
import { ApiContext } from "../context/api/context";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [authType, setAuthType] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [toggleView, setToggleView] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { makeApiRequest } = useContext(ApiContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/Dashboard");
  }, [loading]);

  const handleSignin = async () => {
    setLoading(true);
    const config = {
      method: "POST",
      url: "api/user/signin",
      data: formData,
    };
    const response = await makeApiRequest(config);
    if (!response?.success) {
      setLoading(false);
      return;
    }
    setUser(response?.user);
    localStorage.setItem("token", response?.token);
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    const config = {
      method: "POST",
      url: "api/user/signup",
      data: formData,
    };
    const response = await makeApiRequest(config);
    if (!response?.success) {
      setLoading(false);
      return;
    }
    setUser(response?.user);
    localStorage.setItem("token", response?.token);
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center  ">
        <div className="mt-40">
          {authType === "signin" ? (
            <div className="flex flex-col gap-4 px-8 py-10 bg-white h-[500px]">
              <img src="logo.png" width={70} className="mb-4" />
              <Input
                type={"email"}
                placeholder={"Email"}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required={true}
              />
              <Input
                type={toggleView ? "text" : "password"}
                placeholder={"Password"}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required={true}
              />
              <div
                className="relative -top-[50px] left-[320px] cursor-pointer text-slate-500"
                onClick={() => setToggleView((prev) => !prev)}
              >
                {toggleView ? <AiFillEye /> : <FaEyeSlash />}
              </div>
              <button
                className="bg-blue-700 text-white hover:bg-blue-800 cursor-pointer py-4 rounded-xl "
                onClick={handleSignin}
              >
                Signin
              </button>
              <span className="flex justify-center text-sm text-slate-700 cursor-pointer">
                Don't have an account ?{" "}
                <span
                  className="ml-1 text-blue-800"
                  onClick={() => setAuthType("signup")}
                >
                  click here
                </span>
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-8 py-10 bg-white min-h-[560px]">
              <img src="logo.png" width={70} className="mb-4" />
              <Input
                type={"email"}
                placeholder={"Email"}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required={true}
              />
              <Input
                type={"password"}
                placeholder={"Password"}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required={true}
              />
              <Input
                type={toggleView ? "text" : "password"}
                placeholder={"Confirm password"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required={true}
              />
              <div
                className="relative -top-[50px] left-[320px] cursor-pointer text-slate-500"
                onClick={() => setToggleView((prev) => !prev)}
              >
                {toggleView ? <AiFillEye /> : <FaEyeSlash />}
              </div>
              <button
                className="bg-blue-700 text-white hover:bg-blue-800 cursor-pointer py-4 rounded-xl "
                onClick={handleSignup}
              >
                Signup
              </button>
              <span className="flex justify-center text-sm text-slate-700 cursor-pointer">
                Already have an account ?{" "}
                <span
                  className="ml-1 text-blue-800"
                  onClick={() => setAuthType("signin")}
                >
                  click here
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
