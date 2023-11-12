import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import GoogleButton from "../../components/socialsButton/GoogleButton";
import StravaButton from "../../components/socialsButton/StravaButton";
import { useAuth } from "@/hooks/AuthProvider";
import { Toaster, toast } from "react-hot-toast";
import StravaAPIService from "@/services/StravaAPIService";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleAPIService from "@/services/GoogleAPIService";
import APIDataService from "@/services/APIDataService";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tokens } from "../theme";
import { Button as ShadcnButton } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import CryptoJS from "crypto-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ring } from "ldrs";
import AuthAPIService from "@/services/AuthAPIService";

export default function ProfileSettings() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logout, user, googleConnect, setUser } = useAuth();

  //state for settings form
  const [newSettings, setNewSettings] = useState({
    username: "",
    age: user.age,
    weight: user.weight,
    height: user.height,
  });

  //state for password settins form
  const [newPassword, setNewPassword] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  ring.register();

  //confirmation in update settigns dialog
  const handleUpdateConfirm = async () => {
    const data = {
      email: user.email,
      newSettings: newSettings,
    };

    try {
      const response = await APIDataService.updateUserSetting(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Settings updated!");
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Try again later!");
    }
  };

  //confirmation in update password
  const handleUpdatePassword = async () => {
    const data = {
      email: user.email,
      newPassword: CryptoJS.SHA256(newPassword.newPassword).toString(
        CryptoJS.enc.Base64
      ),
    };

    try {
      const response = await APIDataService.updateUserPassword(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        logout();
        toast.success("Password updated!");
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Try again later!");
    }
  };

  //Strava OAuth flow
  const stravaConnect = () => {
    StravaAPIService.redirectConnect();
  };

  //GoogleConnect
  const handleGoogleConnect = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await GoogleAPIService.getGoogleData(tokenResponse);
        try {
          const anotherResponse = await APIDataService.getByGmail(
            response.data.email
          );
          if (anotherResponse.data === "Null") {
            googleConnect(response.data);
          } else {
            toast.error("This gmail is already linked with another account!");
          }
        } catch (e) {
          console.log(e);
          toast.error("Something went wrong. Try again later!");
        }
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong. Try again later!");
      }
    },
  });

  useEffect(() => {
    console.log(newPassword);
  });

  const handleGetCredentials = async () => {
    setIsLoading(true);
    const data = {
      email: user.email,
    };
    try {
      const response = await AuthAPIService.initialise(data);
      if (Object.keys(response.data) !== 0) {
        setUser(response.data);
        setTimeout(setIsLoading, 2000, false);
      } else {
        toast.error("Something went wrong. Try again later!");
        setTimeout(setIsLoading, 2000, false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Try again later!");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Profile Setting Section */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ textAlign: "left", fontSize: "2.2rem" }}
        >
          Profile Setting
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: "left", fontSize: "1.25rem" }}
        >
          Edit your profile here
        </Typography>
        <Divider sx={{ my: 2, width: "100%" }} />

        {/* Form for Profile Settings */}
        <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
          {/* Username Field */}
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            Username
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register("username")}
            defaultValue={user.username}
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{ width: "90%", marginTop: 1, marginBottom: 2 }}
            onChange={(event) =>
              setNewSettings({ ...newSettings, username: event.target.value })
            }
          />

          {/* Age Field */}
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            Age
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            margin="normal"
            type="number"
            {...register("age")}
            defaultValue={user.age}
            error={!!errors.age}
            helperText={errors.age?.message}
            sx={{ width: "90%", marginTop: 1, marginBottom: 2 }}
            onChange={(event) =>
              setNewSettings({ ...newSettings, age: event.target.value })
            }
          />

          {/* Weight Field */}
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            Weight (kg)
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            margin="normal"
            type="number"
            {...register("weight")}
            defaultValue={user.weight}
            error={!!errors.weight}
            helperText={errors.weight?.message}
            sx={{ width: "90%", marginTop: 1, marginBottom: 2 }}
            onChange={(event) =>
              setNewSettings({ ...newSettings, weight: event.target.value })
            }
          />

          {/* Height Field */}
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            Height (cm)
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            margin="normal"
            type="number"
            {...register("height")}
            defaultValue={user.height}
            error={!!errors.height}
            helperText={errors.height?.message}
            sx={{ width: "90%", marginTop: 1 }}
            onChange={(event) =>
              setNewSettings({ ...newSettings, height: event.target.value })
            }
          />

          {/* Update Profile Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 1,
                  width: "202px",
                  backgroundColor: "rgb(205, 213, 224)",
                  color: "rgb(32, 41, 58)",
                }}
                disabled={
                  newSettings.age === "" ||
                  newSettings.username === "" ||
                  newSettings.weight === "" ||
                  newSettings.height === ""
                    ? true
                    : false
                }
              >
                Update Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle
                  className="pb-1"
                  style={{ color: colors.secondary.default }}
                >
                  Are you sure?
                </DialogTitle>
                <DialogDescription>
                  Please confirm to update your user settings.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <ShadcnButton onClick={handleUpdateConfirm} variant="default">
                    Update
                  </ShadcnButton>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Box>

        <Divider sx={{ my: 2, width: "100%" }} />

        {/* Change Password Section */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ textAlign: "left", fontSize: "2.0rem" }}
        >
          Change Password
        </Typography>

        {/* Form for Change Password */}
        <Box component="form" noValidate sx={{ width: "100%" }}>
          {/* Current Password Field */}
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            Current Password
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register("currentPassword")}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            sx={{ width: "90%", marginTop: 1, marginBottom: 2 }}
            onChange={(event) =>
              setNewPassword({
                ...newPassword,
                currentPassword: event.target.value,
              })
            }
          />

          {/* New Password Field */}
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            New Password
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            sx={{ width: "90%", marginTop: 1, marginBottom: 2 }}
            onChange={(event) =>
              setNewPassword({
                ...newPassword,
                newPassword: event.target.value,
              })
            }
          />
          {newPassword.newPassword.length === 0 ? null : newPassword.newPassword
              .length > 6 ? (
            <div className="flex align-center mb-3">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#0e8a37"}
              >
                Length of password must be more than 6 characters
              </Typography>
              <CheckCircle2 className="ml-5 w-4" style={{ color: "#0e8a37" }} />
            </div>
          ) : (
            <div className="flex align-center mb-3">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#750e0e"}
              >
                Length of password must be more than 6 characters
              </Typography>

              <XCircle className="ml-5 w-4" style={{ color: "#750e0e" }} />
            </div>
          )}

          {/* Confirm New Password Field */}
          <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
            Confirm New Password
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register("confirmNewPassword")}
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message}
            sx={{ width: "90%", marginTop: 1, marginBottom: 2 }}
            onChange={(event) =>
              setNewPassword({
                ...newPassword,
                repeatPassword: event.target.value,
              })
            }
          />

          {newPassword.repeatPassword.length ===
          0 ? null : newPassword.newPassword === newPassword.repeatPassword ? (
            <div className="flex align-center mb-3">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#0e8a37"}
              >
                Password matches
              </Typography>
              <CheckCircle2 className="ml-5 w-4" style={{ color: "#0e8a37" }} />
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

              <XCircle className="ml-5 w-4" style={{ color: "#750e0e" }} />
            </div>
          )}

          {/* Update Password Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 1,
                  width: "202px",
                  backgroundColor: "rgb(205, 213, 224)",
                  color: "rgb(32, 41, 58)",
                }}
                disabled={
                  newPassword.repeatPassword.length === 0 ||
                  newPassword.currentPassword.length === 0 ||
                  newPassword.newPassword.length <= 6 ||
                  newPassword.newPassword !== newPassword.repeatPassword
                    ? true
                    : false
                }
              >
                Update Password
              </Button>
            </DialogTrigger>
            {user.password ===
            CryptoJS.SHA256(newPassword.currentPassword).toString(
              CryptoJS.enc.Base64
            ) ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle
                    className="pb-1"
                    style={{ color: colors.secondary.default }}
                  >
                    Are you sure?
                  </DialogTitle>
                  <DialogDescription>
                    Please confirm to update your password.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <ShadcnButton
                      onClick={handleUpdatePassword}
                      variant="default"
                    >
                      Update
                    </ShadcnButton>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            ) : (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle
                    className="pb-1"
                    style={{ color: colors.secondary.default }}
                  >
                    Invalid Password!
                  </DialogTitle>
                  <DialogDescription>
                    The password you have entered does not match this account's
                    current password!
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            )}
          </Dialog>
        </Box>

        <Divider sx={{ my: 2, width: "100%" }} />

        {/* Connect Section */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ textAlign: "left", fontSize: "2.0rem" }}
        >
          Connect
        </Typography>
        {!user.google_data ? (
          <GoogleButton onClick={() => handleGoogleConnect()}>
            Connect with Google
          </GoogleButton>
        ) : (
          <button
            className="min-w-[202px] text-[#c4c4c4] bg-[#ad392f] font-medium rounded-lg text-sm px-7 py-2 text-center inline-flex items-center mr-2 mb-2"
            disabled
          >
            <svg
              className="w-4 h-4 mr-7"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="#c4c4c4"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Connected
          </button>
        )}
        {user.strava_data ? (
          <button
            className="min-w-[202px] text-[#c4c4c4] bg-[#822600] font-medium rounded-lg text-sm px-7 py-2 text-center inline-flex items-center mr-2 mb-2"
            disabled
          >
            <svg
              className="w-4 h-4 mr-7"
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Strava</title>
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>{" "}
            Connected
          </button>
        ) : (
          <StravaButton onClick={() => stravaConnect()}>
            Connect with Strava
          </StravaButton>
        )}

        {/* Developer Console */}

        <Divider sx={{ my: 2, width: "100%" }} />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ textAlign: "left", fontSize: "2.0rem" }}
        >
          Developer Credential
        </Typography>
        {isLoading ? (
          <l-ring
            size="40"
            stroke="5"
            bg-opacity="0"
            speed="3"
            color="#737373"
          ></l-ring>
        ) : user.clientID ? (
          <div className="w-full">
            <div className="flex w-full max-w-xl items-center gap-1.5 mb-3">
              <Label className="w-[100px]" htmlFor="Client ID">
                Client ID
              </Label>
              <Input
                id="Client ID"
                value={user.clientID}
                disabled
                className="disabled:cursor-text"
              />
            </div>
            <div className="flex w-full max-w-xl items-center gap-1.5 mb-10">
              <Label className="w-[100px]" htmlFor="Client Secret">
                Client Secret
              </Label>
              <Input
                id="Client Secret"
                value={user.clientSecret}
                disabled
                className="disabled:cursor-text"
              />
            </div>
          </div>
        ) : (
          <Button
            variant="contained"
            sx={{
              mt: 1,
              mb: 1,
              width: "202px",
              backgroundColor: "rgb(205, 213, 224)",
              color: "rgb(32, 41, 58)",
            }}
            onClick={handleGetCredentials}
          >
            Obtain Credentials
          </Button>
        )}
      </Box>
    </>
  );
}
