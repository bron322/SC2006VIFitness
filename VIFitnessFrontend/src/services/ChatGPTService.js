import { OpenAIhttp } from "../http-common";

const queryWorkout = async (data) => {
    return OpenAIhttp.post("/chat/completions",data);
}

const ChatGPTservice = {
    queryWorkout,
}
  
export default ChatGPTservice;