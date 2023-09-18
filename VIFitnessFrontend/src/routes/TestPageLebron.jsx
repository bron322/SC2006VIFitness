import { Form, Link } from "react-router-dom";
import { useState } from "react";
import APIDataService from "../services/APIDataService";
import {Toaster, toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// this is Lebron's log in page 

export default function TestPage() {
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    console.log("test");
  };

  const[data,setData] = useState({
    name:'',
    password:'',
  })

  const authenticateUser = async (e) =>{
    console.log("button pressed");
    let authenticate = await authentication(data.username);
    console.log(authenticate);
    if(authenticate) {
      toast.success('Login successful. Welcome to VI Fitness!');
      navigate('/'); //directing to the landing page first  
    } else {
      toast.error("Invalid credentials bro")
    }
  }

  const authentication = async (username) => {
    let response;
    try{
      response = await APIDataService.get(username);
    } catch(err){
      console.log(err);
    }
    //when user doesn't exist or when user keys in wrong password
    console.log(response.data);
    if(response.data === "Null" || response.data.password != data.password) {
      console.log("Invalid credentials");
      return false;
    }else{
      console.log("Authenticated");
      return true;
    }
  }

  return (
    <>
    <div>
      <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
      <Form onSubmit = {authenticateUser}>
        <label>Username : </label>
        <input type = 'text' placeholder='Enter your username:' value = {data.username} onChange = {(e) => setData({...data, username:e.target.value})}/>
        <label>Password : </label>
        <input type = 'password' placeholder='Enter your password:'value = {data.password} onChange = {(e) => setData({...data, password:e.target.value})} />
        <button type ='submit'>Login</button>

      <Link to={"/testregister"} onClick={handlesubmit}>
        Sign Up
      </Link>
      </Form>
    </div> 
    </>
  );
}
