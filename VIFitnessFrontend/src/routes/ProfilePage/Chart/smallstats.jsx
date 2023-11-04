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
import chroma from "chroma-js";

export default function SmallStats(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [statisticsData, setStatisticsData] = useState({});
  const [barColor, setBarColor] = useState({});

  useEffect(() => {
    // let f = chroma.scale(["E95793", "610C9F"]);
    setStatisticsData({
      calorie: Math.floor(
        props.meals.reduce((acc, cur) => acc + parseFloat(cur.calorie), 0)
      ),
      protein: Math.floor(
        props.meals.reduce((acc, cur) => acc + parseFloat(cur.protein), 0)
      ),
      carbohydrate: Math.floor(
        props.meals.reduce((acc, cur) => acc + parseFloat(cur.carbohydrate), 0)
      ),
      fat: Math.floor(
        props.meals.reduce((acc, cur) => acc + parseFloat(cur.fat), 0)
      ),
    });

    // setBarColor({
    //   calorie: f(
    //     statisticsData.calorie / props.limits.calorie > 1
    //       ? 1
    //       : statisticsData.calorie / props.limits.calorie
    //   ).toString(),
    //   protein: f(
    //     statisticsData.protein / props.limits.protein > 1
    //       ? 1
    //       : statisticsData.protein / props.limits.protein
    //   ).toString(),
    //   carbohydrate: f(
    //     statisticsData.carbohydrate / props.limits.carbohydrate > 1
    //       ? 1
    //       : statisticsData.carbohydrate / props.limits.carbohydrate
    //   ).toString(),
    //   fat: f(
    //     statisticsData.fat / props.limits.fat > 1
    //       ? 1
    //       : statisticsData.fat / props.limits.fat
    //   ).toString(),
    // });
  }, [props]);

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
            <PieChartMacros data={props.meals} />
          </div>

          <div className="right-stats-wrapper flex flex-col justify-evenly ">
            <div className="flex-cols items-start">
              <Label
                htmlFor="calorie-bar"
                style={{ color: colors.accent.foreground }}
                className="ml-[-98px] font-bold"
              >
                Calories
              </Label>
              <div className="bar-wrapper flex items-center ml-[-100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Progress
                        id="calorie-bar"
                        innercolor={colors.progress.default}
                        outercolor={colors.progress.foreground}
                        value={
                          (statisticsData.calorie / props.limits.calorie) *
                            100 >
                          100
                            ? 100
                            : (statisticsData.calorie / props.limits.calorie) *
                              100
                        }
                        className="w-[30vh]"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        {statisticsData.calorie} / {props.limits.calorie} Cal
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Label
                  htmlFor="calorie-bar"
                  style={{ color: colors.accent.foreground }}
                  className="ml-2"
                >
                  {statisticsData.calorie}Cal
                </Label>
              </div>
            </div>

            <div className="flex-cols items-start">
              <Label
                htmlFor="protein-bar"
                style={{ color: colors.accent.foreground }}
                className="ml-[-98px] font-bold"
              >
                Proteins
              </Label>
              <div className="bar-wrapper flex items-center ml-[-100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Progress
                        id="protein-bar"
                        innercolor={colors.progress.default}
                        outercolor={colors.progress.foreground}
                        value={
                          (statisticsData.protein / props.limits.protein) * 100
                        }
                        className="w-[30vh]"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        {statisticsData.protein} / {props.limits.protein} g
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Label
                  htmlFor="protein-bar"
                  style={{ color: colors.accent.foreground }}
                  className="ml-2"
                >
                  {statisticsData.protein}g
                </Label>
              </div>
            </div>

            <div className="flex-cols items-start">
              <Label
                htmlFor="carbs-bar"
                style={{ color: colors.accent.foreground }}
                className="ml-[-98px] font-bold"
              >
                Carbohydrates
              </Label>
              <div className="bar-wrapper flex items-center ml-[-100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Progress
                        id="carbs-bar"
                        innercolor={colors.progress.default}
                        outercolor={colors.progress.foreground}
                        value={
                          (statisticsData.carbohydrate /
                            props.limits.carbohydrate) *
                          100
                        }
                        className="w-[30vh]"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        {statisticsData.carbohydrate} /{" "}
                        {props.limits.carbohydrate} g
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Label
                  htmlFor="carbs-bar"
                  style={{ color: colors.accent.foreground }}
                  className="ml-2"
                >
                  {statisticsData.carbohydrate}g
                </Label>
              </div>
            </div>

            <div className="flex-cols items-start">
              <Label
                htmlFor="fats-bar"
                style={{ color: colors.accent.foreground }}
                className="ml-[-98px] font-bold"
              >
                Fats
              </Label>
              <div className="bar-wrapper flex items-center ml-[-100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Progress
                        id="fats-bar"
                        innercolor={colors.progress.default}
                        outercolor={colors.progress.foreground}
                        value={(statisticsData.fat / props.limits.fat) * 100}
                        className="w-[30vh]"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        {statisticsData.fat} / {props.limits.fat} g
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Label
                  htmlFor="fats-bar"
                  style={{ color: colors.accent.foreground }}
                  className="ml-2"
                >
                  {statisticsData.fat}g
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
