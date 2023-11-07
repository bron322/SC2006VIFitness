import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PieChartMacros from "@/components/piechart";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@mui/material";
import { tokens } from "@/routes/theme";
import { useEffect, useState } from "react";
import PieChartStrava from "./stravapiechart";
import PieChartStravaDistance from "./stravapiechartdist";

export default function StravaStats(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="space-y-1 w-full">
        <h2
          className=" text-2xl font-semibold tracking-tight w-full"
          style={{ color: colors.card.foreground }}
        >
          {props.title} Statistics
        </h2>

        <div className="stats-content-wrapper flex justify-center">
          <div className="pie-wrapper mr-[15vw]">
            <PieChartStrava data={props.activities} />
          </div>
          <div className="pie-wrapper ">
            <PieChartStravaDistance data={props.activities} />
          </div>
        </div>
      </div>
    </div>
  );
}
