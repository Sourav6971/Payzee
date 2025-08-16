import { useCallback } from "react";
import { ApiContext } from "./context";
import axios from "axios";
import toast from "react-hot-toast";
// import "dotenv/config";

export default function ApiContextProvider({ children }) {
  const makeApiRequest = useCallback(async ({ method, data, params, url }) => {
    console.log(import.meta.env.VITE_PAYZEE_API_URL);
    try {
      const response = await axios({
        method,
        url: `${import.meta.env.VITE_PAYZEE_API_URL}/${url}`,
        data,
        params,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      } else toast.error(response.data.message);
    } catch (error) {
      console.log("Yaha hai error", error);
      toast.error(error.response.data.message);
    }
  });

  const authenticatedApiRequest = useCallback(
    async (method, data, params, url) => {
      const token = localStorage.getItem("token");
      if (!token)
        return {
          success: false,
        };
      try {
        const response = await axios({
          data,
          method,
          params,
          url: `${import.meta.env.VITE_PAYZEE_API_URL}/${url}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (response.status == 200) toast.success("Signed in");
        else toast.error("Error signing in");
      } catch {
        toast.error("Could not sign in");
      }
    }
  );

  return (
    <ApiContext.Provider value={{ makeApiRequest, authenticatedApiRequest }}>
      {children}
    </ApiContext.Provider>
  );
}
