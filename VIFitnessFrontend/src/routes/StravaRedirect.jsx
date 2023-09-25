import { useEffect } from "react";
import useQuery from "../hooks/useQuery";
import StravaAPIService from "../services/StravaAPIService";
import { useAuth } from "../hooks/AuthProvider";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  let token = {};
  try {
    token = await StravaAPIService.getToken(code);
  } catch (e) {
    console.log(e);
    return redirect("/testoscar");
  }
  console.log(token);
  return { token };
}

export default function StravaRedirect() {
  const query = useQuery();
  const { user, login } = useAuth();
  const { token } = useLoaderData();

  useEffect(() => {
    const userData = {
      ...user,
      strava_data: token,
    };
    console.log(userData);
    login(userData);
  }, []);
  return (
    <>
      <div>Loading...</div>
    </>
  );
}
