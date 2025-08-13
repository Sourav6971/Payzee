import { useCallback } from "react";
import { ApiContext } from "./context";

export default function Api({ children }) {
  const checkFunction = useCallback(() => {
    async () => {
      console.log("Hello world");
    };
  });
  const makeApiRequest = useCallback(async () => {
    //make api call here
  });
  return (
    <ApiContext.Provider value={{ checkFunction }}>
      {children}
    </ApiContext.Provider>
  );
}
