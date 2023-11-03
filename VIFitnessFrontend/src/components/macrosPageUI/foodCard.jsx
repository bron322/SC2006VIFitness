import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import APIDataService from "@/services/APIDataService";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/AuthProvider";

const mealTypes = [
  {
    value: "breakfast",
    label: "Breakfast",
  },
  {
    value: "lunch",
    label: "Lunch",
  },
  {
    value: "dinner",
    label: "Dinner",
  },
];

export default function FoodCard(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataInfo, setDataInfo] = useState({
    n_calorie: 0,
    n_protein: 0,
    n_carb: 0,
    n_fat: 0,
  });
  const [open, setOpen] = useState(false); // open state of combobox for meal type
  const [mealType, setMealType] = useState(""); // track value of meal type selected in combo box
  const { user, setUser } = useAuth();

  useEffect(() => {
    let dataArray = [
      props.data.nf_calories,
      props.data.nf_total_carbohydrate,
      props.data.nf_total_fat,
      props.data.nf_protein,
    ];
    let dataMin = Math.min(...dataArray);
    let dataMax = Math.max(...dataArray);
    setDataInfo({
      n_calorie: (props.data.nf_calories - dataMin) / (dataMax - dataMin),
      n_protein: (props.data.nf_protein - dataMin) / (dataMax - dataMin),
      n_carb:
        (props.data.nf_total_carbohydrate - dataMin) / (dataMax - dataMin),
      n_fat: (props.data.nf_total_fat - dataMin) / (dataMax - dataMin),
    });
  }, []);

  //onClick handler for Add a Meal
  const handleAddMeal = async () => {
    const mealData = {
      foodName: props.data.food_name,
      calorie: props.data.nf_calories,
      protein: props.data.nf_protein,
      carbohydrate: props.data.nf_total_carbohydrate,
      fat: props.data.nf_total_fat,
      mealType: mealType,
      email: user.email,
    };

    try {
      const response = await APIDataService.addMeal(mealData);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Meal added!");
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
      <Card
        className="w-100% min-w-[25vw] col-span-1 mb-4"
        style={{
          backgroundColor: colors.background.children,
          borderColor: colors.background.default,
        }}
      >
        <CardHeader>
          <CardDescription style={{ color: colors.muted.foreground }}>
            Queried Food:
          </CardDescription>
          <CardTitle
            className="mb-2"
            style={{ color: colors.card.foreground, fontSize: "2rem" }}
          >
            {props.data.food_name}
          </CardTitle>
          <img
            src={props.data.photo.thumb}
            className="rounded-md object-contain h-[10vh]"
          />
          <Separator
            className="mt-7"
            style={{ backgroundColor: colors.muted.default }}
          />
        </CardHeader>
        <CardContent>
          <div className="right-stats-wrapper flex flex-col justify-evenly h-[10vh] w-full">
            <div className="bar-wrapper grid grid-cols-5 gap-1">
              <Label
                htmlFor="calorie-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1"
              >
                Calorie
              </Label>
              <div className="inner-bar-wrapper col-span-3 flex items-center">
                <Progress
                  id="calorie-bar"
                  innercolor={colors.progress.default}
                  outercolor={colors.progress.foreground}
                  value={dataInfo.n_calorie * 100}
                />
              </div>
              <Label
                htmlFor="calorie-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1 text-right"
              >
                {props.data.nf_calories} cal
              </Label>
            </div>

            <div className="bar-wrapper grid grid-cols-5 gap-1">
              <Label
                htmlFor="protein-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1"
              >
                Protein
              </Label>
              <div className="inner-bar-wrapper col-span-3 flex items-center">
                <Progress
                  id="protein-bar"
                  innercolor={colors.progress.default}
                  outercolor={colors.progress.foreground}
                  value={dataInfo.n_protein * 100}
                />
              </div>
              <Label
                htmlFor="protein-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1 text-right"
              >
                {props.data.nf_protein} g
              </Label>
            </div>

            <div className="bar-wrapper grid grid-cols-5 gap-1">
              <Label
                htmlFor="carb-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1"
              >
                Carbs
              </Label>
              <div className="inner-bar-wrapper col-span-3 flex items-center">
                <Progress
                  id="carb-bar"
                  innercolor={colors.progress.default}
                  outercolor={colors.progress.foreground}
                  value={dataInfo.n_carb * 100}
                />
              </div>
              <Label
                htmlFor="carb-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1 text-right"
              >
                {props.data.nf_total_carbohydrate} g
              </Label>
            </div>

            <div className="bar-wrapper grid grid-cols-5 gap-1">
              <Label
                htmlFor="fat-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1"
              >
                Fat
              </Label>
              <div className="inner-bar-wrapper col-span-3 flex items-center">
                <Progress
                  id="fat-bar"
                  innercolor={colors.progress.default}
                  outercolor={colors.progress.foreground}
                  value={dataInfo.n_fat * 100}
                />
              </div>
              <Label
                htmlFor="fat-bar"
                style={{ color: colors.accent.foreground }}
                className=" col-span-1 text-right"
              >
                {props.data.nf_total_fat} g
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full flex justify-center">
                <Button
                  variant="pagination"
                  className=""
                  style={{ color: colors.accent.foreground }}
                >
                  Add to Meal
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="pb-1 text-slate-700">
                  Add to Today's Meal
                </DialogTitle>
                <DialogDescription>
                  Please choose the type of meal.
                </DialogDescription>
              </DialogHeader>
              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline2"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                      style={{ color: colors.accent.default }}
                    >
                      {mealType
                        ? mealTypes.find((type) => type.value === mealType)
                            ?.label
                        : "Select meal type..."}
                      <ChevronDown />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search type..."
                        className="h-9"
                      />
                      <CommandEmpty>No meal type found.</CommandEmpty>
                      <CommandGroup>
                        {mealTypes.map((type) => (
                          <CommandItem
                            key={type.value}
                            value={type.value}
                            onSelect={(currentValue) => {
                              setMealType(currentValue);
                              setOpen(false);
                            }}
                          >
                            {type.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                mealType === type.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={handleAddMeal}
                    disabled={mealType === "" ? true : false}
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
