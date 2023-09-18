import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// This is Lebron's sign up page

export default function TestSignUpLebron() {
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    console.log("test");
  };

  const [data, setData] = useState({
    name:'',
    password:'',
  })

  const registerUser = async (e) =>{
    e.preventDefault()
    const {name, password} = data
    try {
      const{data}  = await axios.post('/testregister', {name, password})
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login successful. Welcome to VI Fitness!')
        navigate('/home') //directing to the home page
      }
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div>
      <form onSubmit={registerUser}>
        <label>Username : </label>
        <input type = 'text' placeholder='Enter your username:' value = {data.name} onChange = {(e) => setData({...data, name:e.target.value})}/>
        <label>Password : </label>
        <input type = 'password' placeholder='Enter your password:' value = {data.password} onChange = {(e) => setData({...data, password:e.target.value})} />
        <button type = 'submit'>Submit</button>
      </form>

      <Link to={"/testlogin"} onClick={handlesubmit}>
        Log In
      </Link>
    </div>
  )
}
