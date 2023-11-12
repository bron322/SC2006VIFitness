import { AuthAPIhttp } from "@/http-common";

//POST initialise credentials
const initialise = async (data) => {
  return AuthAPIhttp.post("/initialiseToken", data);
};

const AuthAPIService = {
  initialise,
};

export default AuthAPIService;
