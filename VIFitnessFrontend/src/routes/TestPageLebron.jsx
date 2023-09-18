import { Link } from "react-router-dom";
import { useState } from "react";

// this is Lebron's log in page 

export default function TestPage() {
  const handlesubmit = (e) => {
    console.log("test");
  };

  const[data,setData] = useState({
    name:'',
    password:'',
  })

  const loginUser = (e) => {
    e.preventDefautl();
  }

  return (
    <>
    <div>
      <form onSubmit = {loginUser}>
        <label>Username : </label>
        <input type = 'text' placeholder='Enter your username:' value = {data.name} onChange = {(e) => setData({...data, name:e.target.value})}/>
        <label>Password : </label>
        <input type = 'password' placeholder='Enter your password:'value = {data.name} onChange = {(e) => setData({...data, password:e.target.value})} />
        <button type ='submit'>Login</button>

      <Link to={"/testregister"} onClick={handlesubmit}>
        Sign Up
      </Link>
      </form>
    </div> 
    </>
  );
}
