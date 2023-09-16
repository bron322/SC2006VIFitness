import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import APIDataService from "../services/APIDataService.js";

export default function TestPage() {
  const [usernameQuery, setUsernameQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUsernameQuery(e.target.value);
  };

  const queryUserData = async () => {
    // APIDataService.get(usernameQuery)
    //   .then((response) => {
    //     setUserData(response.data);
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setIsLoading(true);
    try {
      const response = await APIDataService.get(usernameQuery);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      <div className="test-page-wrapper">
        <h1>This is test page</h1>
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

      <Link to={"/user"}>Login</Link>
    </>
  );
}
