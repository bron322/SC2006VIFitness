import { useEffect, useRef } from "react";
import StravaAPIService from "../services/StravaAPIService";
import { useAuth } from "../hooks/AuthProvider";
import { redirect, useLoaderData } from "react-router-dom";
import { ring } from "ldrs";

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
  ring.register();

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;

      stravaAuthLogin(token);
    }
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <l-ring
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="3"
          color="#737373"
        ></l-ring>
      </div>
    </>
  );
}
