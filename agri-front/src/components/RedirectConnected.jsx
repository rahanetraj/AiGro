import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import AILoader from "./AILoader";

const RedirectConnected = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
    return <AILoader />;
  }

  return children;
};

export default RedirectConnected;
