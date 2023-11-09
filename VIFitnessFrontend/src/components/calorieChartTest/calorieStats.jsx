  import BarChartCalorie from "./barchart";
  import { useTheme } from "@mui/material";
  import { tokens } from "@/routes/theme";
  import { useEffect, useState } from "react";
  import chroma from "chroma-js";
  import BarChart from "./barChartTest"
  
  export default function SmallStats(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [statisticsData, setStatisticsData] = useState({});
  
    useEffect(() => {
      // let f = chroma.scale(["E95793", "610C9F"]);
      setStatisticsData({
        calorietaken: Math.floor(
            props.meals.reduce((acc, cur) => acc + parseFloat(cur.calorie), 0)
          ),
        calorieburn : Math.floor(
            props.workouts.reduce((acc, cur) => acc + parseFloat(cur.calories), 0)
          ),
      });

    }, [props]);
  
    return (
      <div className="flex items-center justify-center w-full">
        <div className="space-y-1 w-full">
          <h2
            className=" text-lg font-semibold tracking-tight w-full"
            style={{ color: colors.card.foreground }}
          >
             Statistics
          </h2>
          <div className="stats-content-wrapper flex justify-center">
            <div className="pie-wrapper mr-[15vw]">
              <BarChart data={[props.meals, props.workouts]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  