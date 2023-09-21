import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage.js";

//create a context on global scope
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigation = useNavigate();

  //placeholder function to authenticate user
  const login = async (data) => {
    setUser(data);
    navigation("/user");
  };

  //placeholder function to sign out user
  const logout = () => {
    setUser(null);
    navigation("/", { replace: true });
  };

  //useMemo to improve performance
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//wrap useContext in useAuth as a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
