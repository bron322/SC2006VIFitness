import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import APIDataService from "../services/APIDataService.js";
import NutritionixService from "../services/NutritionixService.js";
import FoodList from "../components/FoodList.jsx";
import jwt_decode from "jwt-decode";
import StravaAPIService from "../services/StravaAPIService.js";
import BrevoAPIService from "../services/BrevoAPIService.js";
import { EmailVerificationButton } from "@/components/EmailVerificationButton.jsx";

export default function TestPage(props) {
  const [usernameQuery, setUsernameQuery] = useState("");
  const [foodQuery, setFoodQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState([]);
  const navigate = useNavigation();

  // keep track of username input field
  const handleChange = (e) => {
    setUsernameQuery(e.target.value);
  };

  // keep track of food input field
  const foodInputChange = (e) => {
    setFoodQuery(e.target.value);
  };

  // Query mongoDB for user data on button click
  const queryUserData = async () => {
    setIsLoading(true);
    try {
      const response = await APIDataService.get(usernameQuery);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Query NutritionixAPI on button click
  const queryNutrition = async () => {
    let data = {
      query: foodQuery,
    };
    try {
      const response = await NutritionixService.getNutrients(data);
      setNutritionData(response.data.foods);
      console.log(nutritionData);
    } catch (err) {
      console.log(err);
    }
  };

  const signin = () => {};

  ///////////////////////////// GOOGLE OAUTH /////////////////////////////////////
  const handleCallbackResponse = (response) => {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "1045036706852-09cqq9sthot4lphn50828qc5cmlkqdqk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);

  const sendEmail = async () => {
    let data = {
      receiverName: "oscar",
      receiverEmail: "oscar.jh9@gmail.com",
      verificationCode: "xxxdde",
    };
    const response = await BrevoAPIService.sendBrevoMail(data);
    console.log(response);
  };

  ///////////////////////////// STRAVA OAUTH /////////////////////////////////////

  const StravaSignIn = () => {
    StravaAPIService.redirectAuthorisation();
  };

  return (
    <>
      <EmailVerificationButton />
      <button onClick={sendEmail}>Send Email</button>
      <div className="test-page-wrapper">
        <h1>Oscar's Test View</h1>
      </div>
      <input placeholder="Enter Username" onChange={handleChange}></input>
      <button onClick={queryUserData}>Fetch</button>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <h1>
          Username: {userData.username} Age: {userData.age}
        </h1>
      )}

      <input placeholder="Enter food" onChange={foodInputChange}></input>
      <button onClick={queryNutrition}>Get Nutrition</button>
      {nutritionData.map((item, index) => {
        return (
          <FoodList
            key={index}
            name={item.food_name}
            calorie={item.nf_calories}
          />
        );
      })}
      <button onClick={signin}>Sign in</button>
      <div id="signInDiv"></div>
      <button onClick={StravaSignIn}>Strava Sign in</button>
    </>
  );
}
