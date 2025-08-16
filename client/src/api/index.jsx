import { useCallback } from "react";
import { ApiContext } from "./context";
import axios from "axios";
import toast from "react-hot-toast";

export default function ApiContextProvider({ children }) {
  const makeApiRequest = useCallback(async (method, data, params, url) => {
    try {
      const response = await axios({
        method,
        url: `${process.env.PAYZEE_API_URL}/${url}`,
        data,
        params,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) toast.success("signed in");
      else toast.error("Error not sign in");
    } catch {}
    //make api call here
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
          url: `${process.env.PAYZEE_API_URL}/${url}`,
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
