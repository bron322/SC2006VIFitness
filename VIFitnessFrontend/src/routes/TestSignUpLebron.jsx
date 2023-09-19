import { Link, Form } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import {Toaster, toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import APIDataService from "../services/APIDataService";

// This is Lebron's sign up page

export default function TestSignUpLebron() {
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    console.log("test");
  };

  const [data, setData] = useState({
    username:'',
    password:'',
  })

  const registerUser = async (e) =>{
    console.log("button pressed");
    let check = await checkDuplicate(data.username);
    console.log(check);
    if(check) {
      toast.error("Username taken");
    } else{
      try{
        const response = await APIDataService.create(data);
        toast.success('Login successful. Welcome to VI Fitness!')
        navigate('/testlogin') //directing to the home page
      } catch(err) {
        console.log(err)
      }
    }
  }

  const checkDuplicate = async (username) => {
    let response;
    try{
      response = await APIDataService.get(username);
    } catch(err){
      console.log(err);
    }
    if(response.data === "Null") {
      console.log("Null");
      return false;
    }else{
      console.log("Duplicate");
      return true;
    }
  }

  return(
    <div>
      <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
      <Form onSubmit={registerUser}>
        <label>Username : </label>
        <input type = 'text' placeholder='Enter your username:' value = {data.username} onChange = {(e) => {
          console.log(data);
          setData({...data, username:e.target.value})}}/>
        <label>Password : </label>
        <input type = 'password' placeholder='Enter your password:' value = {data.password} onChange = {(e) => setData({...data, password:e.target.value})} />
        <button type = 'submit'>Submit</button>
      </Form>

      <Link to={"/testlogin"} onClick={handlesubmit}>
        Log In
      </Link>
    </div>
  )
}
