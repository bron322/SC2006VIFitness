import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../routes/theme";
import { useAuth } from "@/hooks/AuthProvider";

import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import CalorieStats from "./calorieStats.jsx";
import BarChart from "./barChartTest"

function calorie(){
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const { user } = useAuth();

  // filter by today for Statistics
  const filterMealsByToday = (item) => {
    let now = format(new Date(), "PPP");
    const createdDate = format(new Date(item.createdAt), "PPP");
    // console.log(createdDate);
    console.log(now);
    return createdDate === now;
  };

  const filterWorkoutsByToday = (workout) => {
    let now = format(new Date(), "PPP");
    const completedDate = format(new Date(workout.date), "PPP")
    // Check if the workout is completed and has a completion date equal to the current date
    return workout.isCompleted && completedDate === now;
};

  // filter by this week for Statistics
  const filterMealsByWeek = (item) => {
    const cur = new Date();
    const first = startOfWeek(cur);
    const last = endOfWeek(cur);
    const createdDate = new Date(item.createdAt);

    return createdDate >= first && createdDate <= last;
  };

  const filterWorkoutsByWeek = (workout) =>{
    const cur = new Date();
    const first = startOfWeek(cur);
    const last = endOfWeek(cur);
    const completedDate = new Date(workout.date);

    return workout.isCompleted && completedDate >= first && completedDate <= last;
  }

  // filter by this month for Statistics
  const filterMealsByMonth = (item) => {
    const cur = new Date();
    const first = startOfMonth(cur);
    const last = endOfMonth(cur);
    const createdDate = new Date(item.createdAt);

    return createdDate >= first && createdDate <= last;
  };

  const filterWorkoutsByMonth = (workout) =>{
    const cur = new Date();
    const first = startOfMonth(cur);
    const last = endOfMonth(cur);
    const completedDate = new Date(workout.date);

    return workout.isCompleted && completedDate >= first && completedDate <= last;
  }

  return(
    <Tabs defaultValue="today">
      <div className="space-between flex items-center justify-center w-full">
        <TabsList
          style={{ backgroundColor: colors.background.default }}
        >
          <TabsTrigger value="today" className="relative">
            Today
          </TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="today"
        className="border-none p-0 outline-none"
      >
          <Box >
        {/* <CalorieStats
          meals={user.meals.filter(filterMealsByToday)}
          workouts = {user.workouts.filter(filterMealsByToday)}
          title={"Today's"}
          xLabel = {filterMealsByToday}
        /> */}
        <BarChart
        meals={user.meals.filter(filterMealsByToday)}
        workouts = {user.workouts.filter(filterWorkoutsByToday)}
        xLabel = {filterMealsByToday}
      />
        
        </Box>
      </TabsContent>
      <TabsContent
        value="week"
        className="border-none p-0 outline-none " m = "20px 0 10px -10px"
      >
        {/* <CalorieStats
          meals={user.meals.filter(filterMealsByWeek)}
          workouts = {user.workouts.filter(filterMealsByWeek)}
        //   limits={{
        //     calorie: user.macros_setting.calorie * 7,
        //     protein: user.macros_setting.protein * 7,
        //     carbohydrate: user.macros_setting.carbohydrate * 7,
        //     fat: user.macros_setting.fat * 7,
        //   }}
          title={"This Week's"}
        /> */}
        <BarChart
        meals={user.meals.filter(filterMealsByWeek)}
        workouts = {user.workouts.filter(filterWorkoutsByWeek)}
        xLabel = {filterMealsByWeek}
      />
      </TabsContent>
      <TabsContent
        value="month"
        className="border-none p-0 outline-none"
      >
        {/* <CalorieStats
          meals={user.meals.filter(filterMealsByMonth)}
          workouts = {user.workouts.filter(filterMealsByMonth)}
        //   limits={{
        //     calorie:
        //       user.macros_setting.calorie *
        //       getDaysInMonth(new Date()),
        //     protein:
        //       user.macros_setting.protein *
        //       getDaysInMonth(new Date()),
        //     carbohydrate:
        //       user.macros_setting.carbohydrate *
        //       getDaysInMonth(new Date()),
        //     fat:
        //       user.macros_setting.fat *
        //       getDaysInMonth(new Date()),
        //   }}
          title={"This Month's"}
        /> */}
        <BarChart
        meals={user.meals.filter(filterMealsByMonth)}
        workouts = {user.workouts.filter(filterWorkoutsByMonth)}
        xLabel = {filterMealsByMonth}
      />
      </TabsContent>
    </Tabs>
    )
}
export default calorie;