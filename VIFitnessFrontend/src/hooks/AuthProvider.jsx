import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage.js";
import APIDataService from "../services/APIDataService.js";
import userDataGenerator from "../utils/userDataGenerator.js";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

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

    //If user does not exist, create new user, check for gmail first
    if (response.data === "Null") {
      // then check for email
      const secondResponse = await APIDataService.getByEmail(data.email);
      if (secondResponse.data === "Null") {
        const userData = {
          username: uniqueNamesGenerator({
            dictionaries: [colors, adjectives, animals],
            separator: "-",
          }),
          email: data.email,
          password: userDataGenerator.getRandomPassword(),
          google_data: data,
        };
        const createResponse = await APIDataService.createByGoogle(userData);
        setUser(createResponse.data);
        navigation("/user");
      } else {
        setUser(secondResponse.data);
        navigation("/user");
      }
    } else {
      //If user exist, just log in
      setUser(response.data);
      navigation("/user");
    }
  };

  //Connect with Google
  const googleConnect = async (data) => {
    const newData = {
      email: user.email,
      googleData: data,
    };
    const response = await APIDataService.connectToGoogle(newData);
    setUser(response.data);
  };

  //Login with Strava
  const stravaAuthLogin = async (token) => {
    //check if user exist
    const response = await APIDataService.getByStravaID(token.athlete.id);

    //If user does not exist, create new user
    if (response.data === "Null") {
      const userData = {
        username: uniqueNamesGenerator({
          dictionaries: [colors, adjectives, animals],
          separator: "-",
        }),
        email: userDataGenerator.getRandomUID(),
        password: userDataGenerator.getRandomPassword(),
        strava_data: token,
      };
      const createResponse = await APIDataService.createByStrava(userData);
      setUser(createResponse.data);
      navigation("/user");
    } else {
      //If user exist, just log in
      const updateData = {
        email: response.data.email,
        token: token,
      };
      const anotherResponse = await APIDataService.connectToStrava(updateData);
      setUser(anotherResponse.data);
      navigation("/user");
    }
  };

  //Connect with Strava
  const stravaConnect = async (token) => {
    const data = {
      email: user.email,
      token: token,
    };

    const response = await APIDataService.connectToStrava(data);
    setUser(response.data);
    navigation("/user");
  };

  //useMemo to improve performance
  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      googleAuthLogin,
      googleConnect,
      stravaAuthLogin,
      stravaConnect,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//wrap useContext in useAuth as a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
