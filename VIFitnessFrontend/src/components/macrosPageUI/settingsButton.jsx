import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/AuthProvider";
import { tokens } from "@/routes/theme";
import APIDataService from "@/services/APIDataService";
import { useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function SettingsButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, setUser } = useAuth();
  const [limitValues, setLimitValues] = useState({
    calorie: "",
    protein: "",
    carbohydrate: "",
    fat: "",
  });
  const calorieRef = useRef();
  const proteinRef = useRef();
  const carbRef = useRef();
  const fatRef = useRef();
  const [disable, setDisable] = useState(true);

  //calorie input functionality
  let handleInput = (e) => {
    if (e.target.name === "calorie") {
      setLimitValues({ ...limitValues, calorie: e.target.value });
    }
    if (e.target.name === "protein") {
      setLimitValues({ ...limitValues, protein: e.target.value });
    }
    if (e.target.name === "carbohydrate") {
      setLimitValues({ ...limitValues, carbohydrate: e.target.value });
    }
    if (e.target.name === "fat") {
      setLimitValues({ ...limitValues, fat: e.target.value });
    }
    TextValidation(e);
  };

  // restrict search bar text
  const TextValidation = (e) => {
    if (e.target.name === "calorie") {
      calorieRef.current.value = e.target.value.replace(/[^0-9]/gi, "");
    }
    if (e.target.name === "protein") {
      proteinRef.current.value = e.target.value.replace(/[^0-9]/gi, "");
    }
    if (e.target.name === "carbohydrate") {
      carbRef.current.value = e.target.value.replace(/[^0-9]/gi, "");
    }
    if (e.target.name === "fat") {
      fatRef.current.value = e.target.value.replace(/[^0-9]/gi, "");
    }
  };

  //disable/enable button
  useEffect(() => {
    if (
      limitValues.calorie === "" ||
      limitValues.protein === "" ||
      limitValues.carbohydrate === "" ||
      limitValues.fat === ""
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [limitValues]);

  //handle submit
  const handleSubmit = async () => {
    const limitsData = {
      email: user.email,
      newLimits: limitValues,
    };

    try {
      const response = await APIDataService.updateLimits(limitsData);
      setUser(response.data);
      toast.success("Limits Successfully updated");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <DialogTrigger asChild>
        <Button variant="secondary">Edit limits</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-neutral-950">Daily Limits</DialogTitle>
          <DialogDescription>
            Make changes to your daily limits here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="calorie"
              className="text-right"
              style={{ color: "#020817" }}
            >
              Calorie
            </Label>
            <Input
              name="calorie"
              ref={calorieRef}
              id="calorie"
              className="col-span-3"
              maxLength={4}
              onChange={handleInput}
              style={{ color: "#020817" }}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="protein"
              className="text-right"
              style={{ color: "#020817" }}
            >
              Protein
            </Label>
            <Input
              name="protein"
              ref={proteinRef}
              id="protein"
              className="col-span-3"
              maxLength={4}
              onChange={handleInput}
              style={{ color: "#020817" }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="carbohydrate"
              className="text-right"
              style={{ color: "#020817" }}
            >
              Carbohydrate
            </Label>
            <Input
              name="carbohydrate"
              ref={carbRef}
              id="carbohydrate"
              className="col-span-3"
              maxLength={4}
              onChange={handleInput}
              style={{ color: "#020817" }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="fat"
              className="text-right"
              style={{ color: "#020817" }}
            >
              Fat
            </Label>
            <Input
              name="fat"
              ref={fatRef}
              id="fat"
              className="col-span-3"
              maxLength={4}
              onChange={handleInput}
              style={{ color: "#020817" }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogPrimitive.Close asChild>
            <Button type="submit" onClick={handleSubmit} disabled={disable}>
              Save changes
            </Button>
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
