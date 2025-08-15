import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Authenticate({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const session = localStorage.getItem("token");
  useEffect(() => {
    if (!session) {
      toast.error("Signin first");
      navigate("/Auth");
      setIsAuthenticated(false);
      return;
    }
  }, [session, isAuthenticated]);

  useCallback(async () => {
    setIsAuthenticated(false);
    return false;
  }, [session, isAuthenticated]);

  if (!isAuthenticated) return;
  return <>{children}</>;
}
