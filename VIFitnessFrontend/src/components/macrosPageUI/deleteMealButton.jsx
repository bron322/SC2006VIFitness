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
import { Trash2 } from "lucide-react";
import APIDataService from "@/services/APIDataService";
import { useAuth } from "@/hooks/AuthProvider";

export default function DeleteMealButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, setUser } = useAuth();

  const handleDeleteMeal = async () => {
    // console.log(props.data);
    const data = {
      email: user.email,
      createdAt: props.data.createdAt,
    };
    try {
      const response = await APIDataService.deleteMeal(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Meal deleted!");
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error("Something went wrong. Try again later!");
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-full flex justify-center">
            <Button variant="ghostHeader">
              <Trash2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="pb-1 text-slate-700">
              Are you sure?
            </DialogTitle>
            <DialogDescription>
              Click confirm to delete this meal.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDeleteMeal}>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
