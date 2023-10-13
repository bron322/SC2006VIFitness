import { useEffect, useRef } from "react";
import StravaAPIService from "../services/StravaAPIService";
import { useAuth } from "../hooks/AuthProvider";
import { redirect, useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  let token = {};
  //Get token
  try {
    token = await StravaAPIService.getToken(code);
  } catch (e) {
    console.log(e);
    return redirect("/");
  }
  console.log(token);
  return { token };
}

export default function StravaRedirect() {
  const initialised = useRef(false);
  const { user, stravaAuthLogin } = useAuth();
  const { token } = useLoaderData();

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;

      stravaAuthLogin(token);
    }
  }, []);
  return (
    <>
      <div>Loading...</div>
    </>
  );
}
