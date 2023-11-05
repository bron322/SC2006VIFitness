import { useEffect, useRef } from "react";
import StravaAPIService from "../services/StravaAPIService";
import { useAuth } from "../hooks/AuthProvider";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import APIDataService from "@/services/APIDataService";
import { quantum } from "ldrs";
import { rgb } from "chroma-js";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  let token = {};
  //Get token
  try {
    token = await StravaAPIService.getToken(code);
  } catch (e) {
    console.log(e);
    // return redirect("/");
  }
  // console.log(token);
  // return { token };
}

export default function StravaConnectRedirect() {
  const initialised = useRef(false);
  const { user, stravaConnect } = useAuth();
  const navigation = useNavigate();
  const { token } = useLoaderData();
  const [countdown, setCountdown] = useState(5);
  quantum.register();

  const redirectOnExist = () => {
    navigation("/");
  };

  const checkExisting = async () => {
    try {
      const response = await APIDataService.getByStravaID(token.athlete.id);

      if (response.data !== "Null") {
        setTimeout(redirectOnExist, 5000);
        toast.error("This Strava account is already connected...");
      } else {
        stravaConnect(token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(null);
    }
    if (!countdown) return;

    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;

      checkExisting();
    }
  }, []);
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
        <l-quantum size="75" speed="1.75" color={rgb(39, 176, 221)}></l-quantum>
        <div className="mt-5">redirecting in {countdown}...</div>
      </div>
    </>
  );
}
