import axios from "axios";
import { StravaAPIhttp } from "../http-common";

//Options for RedirectAuthorisation
const STRAVA_ID = import.meta.env.PROD
  ? 116798
  : import.meta.env.VITE_STRAVA_ID;
const STRAVA_SECRET = import.meta.env.VITE_STRAVA_SECRET;
const redirectUrl = import.meta.env.PROD
  ? "sc-2006-vi-fitness-frontend.vercel.app/stravaredirect"
  : "http://localhost:5173/stravaredirect";
const redirectConnectUrl = import.meta.env.PROD
  ? "sc-2006-vi-fitness-frontend.vercel.app/stravaconnectredirect"
  : "http://localhost:5173/user/stravaconnectredirect";
const scope = "activity:read,activity:read_all,read";

const redirectAuthorisation = async () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${STRAVA_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
};

const redirectConnect = async () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${STRAVA_ID}&response_type=code&redirect_uri=${redirectConnectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
};

const refreshAuthToken = async (data) => {
  return StravaAPIhttp.post(
    `oauth/token?client_id=${STRAVA_ID}&client_secret=${STRAVA_SECRET}&grant_type=refresh_token&refresh_token=${data.refreshToken}`
  );
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

//Get activities with last 3 days
const getAthleteActivities = async (data) => {
  const response = await axios.get(
    `https://www.strava.com/api/v3/athlete/activities?after=${data.date}`,
    {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    }
  );
  return response;
};

const StravaAPIService = {
  redirectAuthorisation,
  getToken,
  getAthleteData,
  redirectConnect,
  getAthleteActivities,
  refreshAuthToken,
};

export default StravaAPIService;
