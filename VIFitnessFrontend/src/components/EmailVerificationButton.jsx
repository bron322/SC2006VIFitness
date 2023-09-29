import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import BrevoAPIService from "@/services/BrevoAPIService";
import generateOTP from "@/utils/OTPGenerator";
import { Toaster, toast } from "react-hot-toast";
import APIDataService from "@/services/APIDataService";

export function AlertDialogButton(props) {
  const [requested, setRequested] = useState(false); //tracks state of request code button
  const [code, setCode] = useState("12345");
  const [userInputCode, setUserInputCode] = useState("");

  const sendEmail = async (code) => {
    let data = {
      receiverName: props.data.username,
      receiverEmail: props.data.email,
      verificationCode: code,
    };

    const response = await BrevoAPIService.sendBrevoMail(data);
  };

  //action when request code button is pressed
  const handleRequestCode = async () => {
    setRequested(true);
    const vcode = generateOTP();
    setCode(vcode);
    await sendEmail(vcode);
  };

  //action when cancel button is pressed
  const handleCancel = () => {
    setRequested(false);
  };

  //action when submit button is pressed
  const handleSubmit = async () => {
    if (userInputCode === code) {
      try {
        const response = await APIDataService.create(props.data);
        toast.success("Registration successful. Welcome to VI Fitness!");
        navigate("/login"); //directing to the home page
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Invalid Verification Code. Try Again!");
    }
  };

  //fetch from database to check if email already used
  const checkDuplicate = () => {
    let response;
    try{
      response = await APIDataService.getByEmail
    }
  }

  //start of registration flow
  const handleRegistrationFlow = async () => {

  };

  return (
    <AlertDialog>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <AlertDialogTrigger asChild>
        <Button
          onClick={props.handleRegistrationFlow}
          className="w-full"
          variant="register"
          size="register"
        >
          REGISTER
        </Button>
      </AlertDialogTrigger>
      {false ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black pb-0">
              Email Verification
            </AlertDialogTitle>
            {requested ? (
              <AlertDialogDescription>
                An email has been sent to your email. Please check your inbox
                for the verification code.
              </AlertDialogDescription>
            ) : (
              <AlertDialogDescription>
                Please click on "Request code" code button to request a
                verification code.
              </AlertDialogDescription>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-top">
                Verification Code:
              </Label>
              <Input
                id="name"
                placeholder="verification code"
                className="col-span-2"
                onChange={(e) => setUserInputCode(e.target.value)}
              />
              <Button
                onClick={handleRequestCode}
                variant="outline"
                disabled={requested ? true : false}
              >
                Request code
              </Button>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent></AlertDialogContent>
      )}
    </AlertDialog>
  );
}
