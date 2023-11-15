import Header from "@/components/headerlogin";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ring } from "ldrs";
import BrevoAPIService from "@/services/BrevoAPIService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  ring.register();

  const loadingCleanUp = () => {
    setIsLoading(false);
    setSubmitted(true);
  };

  const handleSubmit = async () => {
    if (email.length === 0) {
      toast.error("Please enter a email.");
    } else if (email.length < 8) {
      toast.error("Please enter a valid email");
    } else {
      const response = await APIDataService.resetPasswordStart(email);
      if (response.data === "Null") {
        toast.error("User not found");
      } else {
        setIsLoading(true);
        console.log(response.data);
        const emailData = {
          email: email,
          link: import.meta.env.PROD
            ? `https://sc-2006-vi-fitness-frontend.vercel.app/resetpassword?token=${response.data.token}&id=${response.data.id}`
            : `localhost:5173/resetpassword?token=${response.data.token}&id=${response.data.id}`,
        };
        const response2 = await BrevoAPIService.sendResetLink(emailData);
        console.log(response2);
        setTimeout(setIsLoading, 2000, false);
        setTimeout(setSubmitted, 2000, true);
      }
    }
  };
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className="overflow-x-hidden">
        <Header />

        <div className="w-screen h-screen bg-stone-900 flex justify-center">
          {isLoading ? (
            <div className="flex justify-center mt-[15vh]">
              <l-ring
                size="40"
                stroke="5"
                bg-opacity="0"
                speed="3"
                color="#737373"
              ></l-ring>
            </div>
          ) : !submitted ? (
            <Card className="w-[35vw] h-fit mt-10 bg-stone-950 border-stone-950">
              <CardHeader>
                <CardTitle className="text-2xl text-stone-300">
                  Find Your Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Separator className="bg-stone-500 my-4" />
                <div className="my-6">
                  <span className="text-stone-300">
                    Please enter your email address to search for your account.
                  </span>
                </div>

                <Input
                  className="border-stone-600 text-stone-300 placeholder-stone-500 w-[20vw] focus:border-stone-300"
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Separator className="bg-stone-500 my-4" />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="mx-2 text-stone-300 hover:bg-stone-700"
                  variant="outline2"
                >
                  <Link to={"/login"}>Cancel</Link>
                </Button>
                <Button
                  className="bg-stone-100 hover:bg-stone-300"
                  variant="secondary"
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="w-[35vw] h-fit mt-10 bg-stone-950 border-stone-950">
              <CardHeader>
                <CardTitle className="text-2xl text-stone-300">
                  Reset Link Sent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Separator className="bg-stone-500 my-4" />
                <div className="my-6">
                  <span className="text-stone-300">
                    A reset link has been sent to the email linked to your
                    account. Please check your email for further actions.
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
          )}
        </div>
      </div>
    </>
  );
}
