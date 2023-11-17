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
import { tokens } from "@/routes/theme";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { Button as ShadcnButton } from "@/components/ui/button";
import { useAuth } from "@/hooks/AuthProvider";
import { Toaster, toast } from "react-hot-toast";
import APIDataService from "@/services/APIDataService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UpdateSettingsButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, setUser } = useAuth();

  const handleUpdateConfirm = async () => {
    const data = {
      email: user.email,
      newSettings: {
        username: props.for === "username" ? props.new : user.username,
        age: props.for === "age" ? props.new : user.age,
        weight: props.for === "weight" ? props.new : user.weight,
        height: props.for === "height" ? props.new : user.height,
      },
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

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="contained"
            sx={{
              mt: 1,
              mb: 1,
              width: "140px",
              height: props.height,
              backgroundColor: "rgb(205, 213, 224)",
              color: "rgb(32, 41, 58)",
            }}
            disabled={props.disabled}
          >
            {props.content}
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
              Please confirm to update your user setting.
              <div className="mt-5">
                Current: <span className="font-extrabold">{props.current}</span>
              </div>
              <div>
                New: <span className="font-extrabold">{props.new}</span>
              </div>
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
    </>
  );
}
