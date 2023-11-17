import Header from "@/components/headerlanding";
import { Button } from "@/components/ui/button";
import useQuery from "@/hooks/useQuery";
import { useRef, useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import APIDataService from "@/services/APIDataService";
import { Typography } from "@mui/material";
import { CheckCircle2, XCircle } from "lucide-react";
import CryptoJS from "crypto-js";
import { ring } from "ldrs";
import PasswordValidator from "@/components/passwordValidator.jsx";
import checkPassword from "@/utils/passwordChecker";

export default function ResetPasswordPage() {
  const [params, setParams] = useSearchParams();
  const initialised = useRef(false);
  const [authorised, setAuthorised] = useState(false);
  const [password, setPassword] = useState({
    new: "",
    repeat: "",
  });
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  ring.register();

  const handleEventFlow = async () => {
    if (params.get("token") === null || params.get("id") === null) {
      setAuthorised(false);
    } else {
      //check if token exists
      const response = await APIDataService.getToken(params.get("token"));
      if (response.data === "Null") {
        setAuthorised(false);
      } else {
        setAuthorised(true);
      }
    }
  };

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;

      handleEventFlow();
    }
  }, []);

  useEffect(() => {
    console.log(checkPassword(password.new));
  }, [password]);

  //hash
  const hashPassword = async (password) => {
    return CryptoJS.SHA256(password);
  };

  const handleSubmit = async () => {
    if (password.new.length === 0 || password.repeat.length === 0) {
      toast.error("Please fill in all fields.");
    } else if (!checkPassword(password.new)) {
      toast.error("Invalid password format. Please check again!");
    } else if (password.repeat !== password.new) {
      toast.error("Password does not match. Please check again!");
    } else {
      setIsLoading(true);
      try {
        const hash = await hashPassword(password.new);
        const data = {
          id: params.get("id"),
          newPassword: hash.toString(CryptoJS.enc.Base64),
          token: params.get("token"),
        };
        const response = await APIDataService.resetPassword(data);
        if (Object.keys(response.data).length !== 0) {
          setSuccess(true);
          setTimeout(setIsLoading, 2000, false);
        } else {
          toast.error("Something went wrong. Try again later!");
          setTimeout(setIsLoading, 2000, false);
        }
      } catch (err) {
        toast.error("Something went wrong. Try again later!");
        setTimeout(setIsLoading, 2000, false);
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className="overflow-x-hidden">
        <Header />
        <div className="w-screen h-screen bg-stone-900 flex justify-center ">
          {authorised ? (
            isLoading ? (
              <div className="flex justify-center mt-[15vh]">
                <l-ring
                  size="40"
                  stroke="5"
                  bg-opacity="0"
                  speed="3"
                  color="#737373"
                ></l-ring>
              </div>
            ) : success ? (
              <Card className="w-[35vw] h-fit mt-10 bg-stone-950 border-stone-950">
                <CardHeader>
                  <CardTitle className="text-2xl text-stone-300">
                    Password Changed Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Separator className="bg-stone-500 my-4" />
                  <div className="my-6">
                    <span className="text-stone-300">
                      Your password has successfully been resetted. Please
                      proceed to the Login page.
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    className="mx-2 text-stone-300 hover:bg-stone-700"
                    variant="outline2"
                  >
                    <Link to={"/login"}>Go back</Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div>
                <Card className="w-[35vw] h-fit mt-10 bg-stone-950 border-stone-950">
                  <CardHeader>
                    <CardTitle className="text-2xl text-stone-300">
                      Reset Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Separator className="bg-stone-500 my-4" />
                    <div className="my-6">
                      <span className="text-stone-300">
                        Please enter your new password:
                      </span>
                    </div>

                    <Input
                      className="border-stone-600 text-stone-300 placeholder-stone-500 w-[20vw] focus:border-stone-300"
                      placeholder="New password"
                      onChange={(e) =>
                        setPassword({ ...password, new: e.target.value })
                      }
                    ></Input>

                    <PasswordValidator newPassword={password.new} />

                    <div className="my-6">
                      <span className="text-stone-300">
                        Enter your password again:
                      </span>
                    </div>

                    <Input
                      className="mt-5 border-stone-600 text-stone-300 placeholder-stone-500 w-[20vw] focus:border-stone-300"
                      placeholder="New password"
                      onChange={(e) =>
                        setPassword({ ...password, repeat: e.target.value })
                      }
                    ></Input>

                    {password.repeat.length === 0 ? null : password.new ===
                      password.repeat ? (
                      <div className="flex align-center mb-3">
                        <Typography
                          level="body-sm"
                          sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                          color={"#0e8a37"}
                        >
                          Password matches
                        </Typography>
                        <CheckCircle2
                          className="ml-5 w-4"
                          style={{ color: "#0e8a37" }}
                        />
                      </div>
                    ) : (
                      <div className="flex align-center mb-3">
                        <Typography
                          level="body-sm"
                          sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                          color={"#750e0e"}
                        >
                          Password does not match
                        </Typography>

                        <XCircle
                          className="ml-5 w-4"
                          style={{ color: "#750e0e" }}
                        />
                      </div>
                    )}

                    <Separator className="bg-stone-500 my-4" />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      className="bg-stone-100 hover:bg-stone-300"
                      variant="secondary"
                      onClick={handleSubmit}
                    >
                      Confirm
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )
          ) : (
            <div>
              <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-stone-300 p-10 mt-10">
                Access Denied
              </h1>
              <p className="text-stone-400 leading-7 [&:not(:first-child)]:mt-6">
                You do not have access to this page, or you reset link has
                expired. Please return to home page.
              </p>
              <div className="flex justify-center p-10 mt-10">
                <Button
                  variant="outline2"
                  className="text-stone-300 hover:bg-stone-700"
                >
                  <Link to={"/"}>Go back to Landing</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
