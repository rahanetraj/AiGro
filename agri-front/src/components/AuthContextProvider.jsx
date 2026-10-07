import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser, logIn, logOut, signUp } from "../services/authService";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name, pays, region) => {
    try {
      await signUp(email, password, name, pays, region);
    } catch (e) {
      throw new Error(e?.message);
    }
  };

  const login = async (email, password) => {
    try {
      logIn(email, password).then(setUser);
    } catch (e) {
      throw new Error(e?.message);
    }
  };

  const logout = async () => {
    try {
      logOut().then(setUser);
    } catch (e) {
      throw new Error(e?.message);
    }
  };

  const init = () => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    init();
  }, []);

  const value = { user, loading, signup, login, logout };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthContextProvider;
