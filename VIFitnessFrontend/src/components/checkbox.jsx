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
  import { Button } from "@/components/ui/button";
  import { tokens } from "@/routes/theme";
  import { useTheme } from "@mui/material";
  import toast, { Toaster } from "react-hot-toast";
  import APIDataService from "@/services/APIDataService";
  import { useAuth } from "@/hooks/AuthProvider";
  import Checkbox from '@mui/material/Checkbox';
  import React, { useState } from "react";
  
  export default function CheckBox(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { user, setUser } = useAuth();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleCancel = () => {
        // Perform any cancellation logic here, such as closing the dialog or resetting state
        setIsChecked(false);
    }
  
    const handleMarkAsCompleted = async () => {
        console.log(props);
        const data = {
            username: user.username,
            date: props.data.createdAt,
        };

        try {
            const response = await APIDataService.updateExercise(data);
            if (Object.keys(response.data).length !== 0) {
            setUser(response.data);
            toast.success("Exercise mark as completed!");
            console.log("Test");

            } else {
            toast.error("Something went wrong. Try again later!");
            }
        } catch (err) {
            console.log("test");
            console.error("Error updating exercise:", err.message);
        }
    };
  
    return (
      <>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex justify-center">
                <Checkbox 
                checked={isChecked} onChange={handleCheckboxChange} 
                />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="pb-1 text-slate-700">
                Are you sure?
              </DialogTitle>
              <DialogDescription>
                Click confirm to mark as completed.
              </DialogDescription>
            </DialogHeader>
  
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleMarkAsCompleted}>Confirm</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleCancel}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  