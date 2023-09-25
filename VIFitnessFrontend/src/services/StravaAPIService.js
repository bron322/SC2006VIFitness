import axios from "axios";
import { StravaAPIhttp } from "../http-common";

//Options for RedirectAuthorisation
const STRAVA_ID = import.meta.env.VITE_STRAVA_ID;
const STRAVA_SECRET = import.meta.env.VITE_STRAVA_SECRET;
const redirectUrl = "http://localhost:5173/stravaredirect";
const scope = "read";

const redirectAuthorisation = async () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${STRAVA_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
};

//Get Authorization token
const getToken = async (codeParam) => {
  const res = await StravaAPIhttp.post("/oauth/token", {
    client_id: STRAVA_ID,
    client_secret: STRAVA_SECRET,
    code: codeParam,
    grant_type: "authorization_code",
  });

  const token = {
    tokenType: res.data.token_type,
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
    expiresAt: res.data.expires_at,
    expiresIn: res.data.expires_in,
    athlete: res.data.athlete,
  };
  return token;
};

//Uses strava_data in user object
const getAthleteData = async (stravaData) => {
  const response = await axios.get(
    `https://www.strava.com/api/v3/athletes/${stravaData.athlete.id}/stats`,
    {
      headers: { Authorization: `Bearer ${stravaData.accessToken}` },
    }
  );
  return response;
};

const StravaAPIService = { redirectAuthorisation, getToken, getAthleteData };

export default StravaAPIService;
