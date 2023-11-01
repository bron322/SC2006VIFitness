import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";

export default function FoodCard(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataInfo, setDataInfo] = useState({
    n_calorie: 0,
    n_protein: 0,
    n_carb: 0,
    n_fat: 0,
  });

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

  return (
    <Card
      className="w-100% min-w-[25vw] col-span-1 "
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
    </Card>
  );
}
