import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Authenticate({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const session = localStorage.getItem("token");
  useEffect(() => {
    if (!session) {
      navigate("/Auth");
      setIsAuthenticated(false);
      return;
    }
    if (session) {
      setIsAuthenticated(true);
    }
  }, [session, isAuthenticated]);

  if (!isAuthenticated) return;

  return <>{children}</>;
}
