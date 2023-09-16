import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TestPage() {
  const [usernameQuery, setUsernameQuery] = useState("");
  const [userData, setUserData] = useState();

  const handleChange = (e) => {
    setUsernameQuery(e.target.value);
  };

  const handleClick = () => {
    getUser(usernameQuery);
  };

  return (
    <>
      <div className="test-page-wrapper">
        <h1>This is test page</h1>
      </div>
      <input placeholder="Enter Username" onChange={handleChange}></input>
      <button onClick={handleClick}>Fetch</button>

      <Link to={"/user"}>Login</Link>
    </>
  );
}
