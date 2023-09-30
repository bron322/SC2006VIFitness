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
import { useEffect, useState } from "react";
import BrevoAPIService from "@/services/BrevoAPIService";
import generateOTP from "@/utils/OTPGenerator";
import { Toaster, toast } from "react-hot-toast";
import APIDataService from "@/services/APIDataService";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export function AlertDialogButton(props) {
  const [requested, setRequested] = useState(false); //tracks state of request code button
  const [code, setCode] = useState("12345");
  const [userInputCode, setUserInputCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showUserExist, setShowUserExist] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const navigate = useNavigate();

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
    setShowLoading(true);
    setShowUserExist(false);
    setShowVerification(false);
  };

  //action when submit button is pressed
  const handleSubmit = async () => {
    if (userInputCode === code) {
      try {
        const response = await APIDataService.create(props.data);
        toast.success(
          "Registration successful. You may now login via the login page!"
        );
        setTimeout(navigate, 1000, "/login"); //directing to the login page
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Invalid Verification Code. Try Again!");
    }
  };

  //fetch from database to check if email already used
  const checkDuplicate = async (email) => {
    let response;
    try {
      response = await APIDataService.getByEmail(email);
    } catch (err) {
      console.log(err);
    }
    if (response.data === "Null") {
      console.log("Null");
      return false;
    } else {
      console.log("Duplicate");
      return true;
    }
  };

  //start of registration flow
  const handleRegistrationFlow = async () => {
    setTimeout(setShowLoading, 1500, false);
    //check if user exist
    let check = await checkDuplicate(props.data.email);

    // if exist show error content
    if (check) {
      setShowVerification(false);
      setShowUserExist(true);
    } else {
      // if dont exist show verification code content
      setShowVerification(true);
      setShowUserExist(false);
    }
  };

  //check if empty field
  const checkEmpty = () => {
    if (props.data.username === "") {
      return setDisableButton(true);
    } else if (props.data.email === "") {
      return setDisableButton(true);
    } else if (props.data.password === "") {
      return setDisableButton(true);
    } else if (props.data.weight === "") {
      return setDisableButton(true);
    } else if (props.data.height === "") {
      return setDisableButton(true);
    } else if (props.data.age === "") {
      return setDisableButton(true);
    } else {
      return setDisableButton(false);
    }
  };

  useEffect(() => {
    checkEmpty();
  }, [props.data]);

  return (
    <AlertDialog>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <AlertDialogTrigger asChild>
        <Button
          onClick={handleRegistrationFlow}
          className="w-full"
          variant="register"
          size="register"
          disabled={disableButton ? true : false}
        >
          REGISTER
        </Button>
      </AlertDialogTrigger>
      {showLoading ? (
        <AlertDialogContent>
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        </AlertDialogContent>
      ) : null}
      {!showLoading && showVerification ? (
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
                placeholder="enter code here"
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
      ) : null}
      {!showLoading && showUserExist ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black pb-0">
              Email Already Linked
            </AlertDialogTitle>
            <AlertDialogDescription>
              An account was already linked to this email. Please try again with
              a different email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              Try Again!
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : null}
    </AlertDialog>
  );
}
