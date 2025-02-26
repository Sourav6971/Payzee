import axios from "axios";

export async function useBackend(method, privateKey) {
  const response = await axios.post(
    "http://localhost:8000/api/account/" + method,
    { privateKey },
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data.msg;
}
