import { useCallback } from "react";
import { ApiContext } from "./context";
import axios from "axios";
import toast from "react-hot-toast";

export default function ApiContextProvider({ children }) {
  const makeApiRequest = useCallback(
    async ({ method, data, params, url, token }) => {
      try {
        const response = await axios({
          method,
          url: `${import.meta.env.VITE_PAYZEE_API_URL}/${url}`,
          data,
          params,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (response.data.success) {
          toast.success(response?.data?.message);
          return response?.data;
        } else toast.error(response?.data?.message);
      } catch (error) {
        toast.error(error?.response?.data?.message ?? error?.message);
      }
    }
  );

  return (
    <ApiContext.Provider value={{ makeApiRequest }}>
      {children}
    </ApiContext.Provider>
  );
}
