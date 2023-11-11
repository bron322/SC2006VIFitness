import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Chart/Header";
import Macros from "./Chart/macros";
import StatBox from "./Chart/StatBox";
import ExerciseBox from "./Chart/ExerciseBox";
import { useAuth } from "@/hooks/AuthProvider";
// import Calendar from "./Chart/Calendar";
import Calendar from "../Calendar/components/SmallCalendar"
import { Link } from 'react-router-dom';
import BarChart from "../../components/calorieChart/calorie";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  const completedWorkouts = user.workouts.filter(workout => workout.isCompleted);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to my dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.background.default}
          p="30px"
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Typography variant="h5" fontWeight="600" style={{ marginTop: '-10px' }}>
            User Profile
          </Typography>
          {/* sx={{ flexDirection: 'row' }} */}
          <Box height="250px" className='flex flex-col items-center justify-evenly'>
            <StatBox
              subtitle={user.age}
              title="Age" />
            <StatBox
              subtitle={user.height + " cm"}
              title="Height" />
            <StatBox
              subtitle={user.weight + " kg"}
              title="Weight" />

          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.background.default}
          overflow= 'auto'
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary.default}`}
            colors={colors.secondary.default}
            p="15px"
            position="sticky"
            top="0"
            zIndex="10"
            style = {{opacity:1, backgroundColor: colors.background.default}}
          >
            <Typography
              variant="h5"
              fontWeight="600"
            >
              Completed Workout
            </Typography>
          </Box>
          
          {completedWorkouts.length > 0 ? (
            completedWorkouts.map((workout, i) => (
              <Box
                key={`${i}-${workout.name}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.secondary.default}`}
                className='flex flex-col justify-evenly'
                p="15px"
              >
                <ExerciseBox
                      subtitle={`${workout.day} - ${workout.month} - ${workout.year}`}
                      title={workout.name} />
              </Box>
            ))
          ) : (
            <Box 
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px"
              component = {Link} to="workout-planner"
            >
              <Typography variant="h5" fontWeight="600">
                Start doing your workout now !!!
              </Typography>
            </Box>
          )}

        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.background.default}
          className="rounded-lg border"
          borderColor={colors.secondary.default}
          overflow = "auto"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Completed Workout 
          </Typography> */}

        {/* <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box> */}
        {/* </Box> */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.background.default}
          padding="20px"
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "5px" }}
          >
            Calendar
          </Typography>
          <Box height="250px" mt="-15px">
            {/* <Calendar /> */}
            <Calendar />
          </Box> 
        </Box>

        

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.background.default}
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.accent.foreground}
              >
                Macros Tracker
              </Typography>
            </Box>
          </Box>
          <Box
            height="350px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            m="0 30px">
            {/* <LineChart isDashboard={true} /> */}
            <Macros />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.background.default}
          overflow= 'auto'
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary.default}`}
            colors={colors.secondary.default}
            p="15px"
            position="sticky"
            top="0"
            zIndex="10"
            style = {{opacity:1, backgroundColor: colors.background.default}}
          >
            <Typography
              variant="h5"
              fontWeight="600"
            >
              Upcoming Event
            </Typography>
          </Box>
          {user.workouts.map((workout, i) => {
            if (workout.isCompleted === false) {
              return (
              <Box
                key={`${i}-${workout.name}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.secondary.default}`}
                className='flex flex-col justify-evenly'
                p="15px"
              >
                <ExerciseBox
                      subtitle={`${workout.day} - ${workout.month} - ${workout.year}`}
                      title={workout.name} />
              </Box>
              );
            }
            return null; // Don't render the workout if it's not completed
          })}

        </Box>

        
        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.background.default}
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.accent.foreground}
              >
                Calories Taken vs Calories Burn
              </Typography>
            </Box>
          </Box>
          <Box 
            height="500px"
            alignItems= "center" 
            justifyContent= "center" 
            display = "flex" 
            m = "0 30px">
            <BarChart/>
          </Box>
          
        </Box>

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          overflow="auto"
          backgroundColor={colors.background.default}
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary.default}`}
            colors={colors.secondary.foreground}
            p="15px"
          >
            <Typography
              color={colors.accent.foreground}
              variant="h5"
              fontWeight="600"
            >
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.muted.foreground}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.accent.foreground}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.muted.foreground}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.muted.foreground}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.secondary.default}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}
      </Box>
    </Box>
  );
}
