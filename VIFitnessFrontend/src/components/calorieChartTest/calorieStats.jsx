  import BarChartCalorie from "./barchart";
//   import { Label } from "@/components/ui/label";
//   import { Progress } from "@/components/ui/progress";
  import { useTheme } from "@mui/material";
  import { tokens } from "@/routes/theme";
  import { useEffect, useState } from "react";
  import chroma from "chroma-js";
  
  export default function SmallStats(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [statisticsData, setStatisticsData] = useState({});
    // const [barColor, setBarColor] = useState({});
  
    // useEffect(() => {
    //   // let f = chroma.scale(["E95793", "610C9F"]);
    //   setStatisticsData({
    //     calorie: Math.floor(
    //       props.meals.calorie
    //     ),
    //     protein: Math.floor(
    //       props.meals.protein
    //     ),
    //     carbohydrate: Math.floor(
    //       props.meals.carb
    //     ),
    //     fat: Math.floor(
    //       props.meals.fat
    //     ),
    //   });

    // }, [props]);
  
    return (
      <div className="flex items-center justify-center w-full">
        <div className="space-y-1 w-full">
          <h2
            className=" text-lg font-semibold tracking-tight w-full"
            style={{ color: colors.card.foreground }}
          >
            {props.title} Statistics
          </h2>
  
          <div className="stats-content-wrapper flex justify-center">
            <div className="pie-wrapper mr-[15vw]">
              <BarChartCalorie data={props.meals} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  