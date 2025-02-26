import axios from "axios";
import { useNavigate } from "react-router-dom";

export async function useBackend(method, privateKey) {
  const response = await axios.post(
    "https://payzee-taupe.vercel.app/api/account/" + method,
    { privateKey },
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data.msg;
}
