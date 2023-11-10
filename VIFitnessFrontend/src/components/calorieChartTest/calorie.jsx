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
import BarChart from "./barChart"

function calorie(){
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const { user } = useAuth();
const now = format(new Date(), "PPP");

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

  const getWeekDates = () => {
    const cur = new Date();
    const startOfWeekDate = startOfWeek(cur);
    const endOfWeekDate = endOfWeek(cur);

    const formattedStartDate = format(startOfWeekDate, 'PP');
    const formattedEndDate = format(endOfWeekDate, 'PP');

    const formattedWeek = `${formattedStartDate} - ${formattedEndDate}`;
    
    return formattedWeek;
  };

  const weekDates = getWeekDates();

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

  const getMonthDates = () => {
    const cur = new Date();
    const first = startOfMonth(cur);
    const last = endOfMonth(cur);

    const formattedStartDate = format(first, 'PP');
    const formattedEndDate = format(last, 'PP');

    const formattedMonth = `${formattedStartDate} - ${formattedEndDate}`;
    
    return formattedMonth;
  };
  const monthDates = getMonthDates();

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
        <BarChart
        meals={user.meals.filter(filterMealsByToday)}
        workouts = {user.workouts.filter(filterWorkoutsByToday)}
        xLabel = {now}
        title={"Today's"}
      />
        
        </Box>
      </TabsContent>
      <TabsContent
        value="week"
        className="border-none p-0 outline-none " m = "20px 0 10px -10px"
      >
        <BarChart
        meals={user.meals.filter(filterMealsByWeek)}
        workouts = {user.workouts.filter(filterWorkoutsByWeek)}
        xLabel = {weekDates}
        title={"This Week's"}
      />
      </TabsContent>
      <TabsContent
        value="month"
        className="border-none p-0 outline-none"
      >
        <BarChart
        meals={user.meals.filter(filterMealsByMonth)}
        workouts = {user.workouts.filter(filterWorkoutsByMonth)}
        xLabel = {monthDates}
        title={"This Month's"}
      />
      </TabsContent>
    </Tabs>
    )
}
export default calorie;