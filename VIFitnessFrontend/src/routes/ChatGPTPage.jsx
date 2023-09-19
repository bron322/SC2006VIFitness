import { Form, Link } from "react-router-dom";
import { useState } from "react";
import APIDataService from "../services/APIDataService";
import axios from "axios";
import ChatGPTservice from "../services/ChatGPTService";

//this is Lebron chatgpt page

export default function ChatGPTTest() {
    
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
  
    const handlesubmit = async (e) => {
        console.log("Yo")
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Say this is a test!"}],
        }
      try {
        const response = await ChatGPTservice.queryWorkout(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    };
  
    return (
      <>
      <Form onSubmit={handlesubmit}>
        <div>
            <label>Just ask something : </label> 
        </div>
        <div>
            <input type = "text" value = {prompt} onChange={(e) => setPrompt(e.target.value)}/>
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
      </Form>
      <div>
        <p>{response}</p>
      </div>
      </>
    );
}