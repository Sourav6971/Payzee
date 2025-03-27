import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import BACKEND_URL from "../config";
import { useDebounce } from "./../hooks/UseDebounce";

const Payments = () => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const debouncedFilter = useDebounce(userFilter);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/Auth");
    axios
      .get(BACKEND_URL + "user/get-users?filter=" + debouncedFilter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setAvailableUsers(res.data.users))
      .catch((err) => console.log(err));
  }, [debouncedFilter]); // Updated dependency to debouncedFilter

  return (
    <div className="min-h-screen bg-background-dark text-text-light ">
      <Navbar />
      <div className="flex justify-center">
        <form className="flex self-center justify-center bg-[#693382] py-4 px-10 mt-20 rounded-2xl  align-middle">
          <input
            placeholder="Search users.."
            className="outline-none"
            onChange={(e) => setUserFilter(e.target.value)}
          ></input>
          <button type="submit" className="cursor-pointer">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payments;
