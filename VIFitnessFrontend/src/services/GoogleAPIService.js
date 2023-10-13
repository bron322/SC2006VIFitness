import axios from "axios";

const getGoogleData = async (googleToken) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      headers: { Authorization: `Bearer ${googleToken.access_token}` },
    }
  );
  return response;
};

const GoogleAPIService = { getGoogleData };

export default GoogleAPIService;
