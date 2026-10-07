import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import AILoader from "./AILoader";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login", { replace: true });
    return <AILoader />;
  }
  return children;
};

export default ProtectedRoute;
