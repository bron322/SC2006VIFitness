import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage.js";
import APIDataService from "../services/APIDataService.js";
import userDataGenerator from "../utils/userDataGenerator.js";

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

  //Login with Google
  const googleAuthLogin = async (data) => {
    //check if user exist
    const response = await APIDataService.getByGmail(data.email);

    //If user does not exist, create new user
    if (response.data === "Null") {
      const userData = {
        username: userDataGenerator.getRandomUsername(),
        password: userDataGenerator.getRandomPassword(),
        google_data: data,
      };
      const createResponse = await APIDataService.createByGoogle(userData);
      setUser(createResponse.data);
      navigation("/user");
    } else {
      //If user exist, just log in
      setUser(response.data);
      navigation("/user");
    }
  };

  //Login with Strava
  const stravaAuthLogin = async (token) => {
    //check if user exist
    const response = await APIDataService.getByStravaID(token.athlete.id);

    //If user does not exist, create new user
    if (response.data === "Null") {
      const userData = {
        username: userDataGenerator.getRandomUsername(),
        password: userDataGenerator.getRandomPassword(),
        strava_data: token,
      };
      const createResponse = await APIDataService.createByStrava(userData);
      setUser(createResponse.data);
      navigation("/user");
    } else {
      //If user exist, just log in
      setUser(response.data);
      navigation("/user");
    }
  };

  //useMemo to improve performance
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      googleAuthLogin,
      stravaAuthLogin,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//wrap useContext in useAuth as a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
