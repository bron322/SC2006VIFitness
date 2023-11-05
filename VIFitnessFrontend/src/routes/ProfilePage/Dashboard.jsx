import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Chart/Header";
import Macros from "./Chart/macros";
import StatBox from "./Chart/StatBox";
import { useAuth } from "@/hooks/AuthProvider";
// import Calendar from "./Chart/Calendar";
import Calendar from "../Calendar/components/SmallCalendar"

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

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

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.background.default}
          p="30px"
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Typography variant="h5" fontWeight="600">
            User Profile
          </Typography>
          {/* sx={{ flexDirection: 'row' }} */}
          <Box height="250px" className='flex flex-col items-center justify-evenly'>
              <StatBox 
              subtitle= {user.age} 
              title= "Age"/>
              <StatBox 
             subtitle= {user.height + " cm"}
             title= "Height"/>
             <StatBox 
             subtitle= {user.weight + " kg"}
             title= "Weight"/>

          </Box>
  
        </Box>
        <Box
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
            Workout Plan
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 5"
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
          <Box height="250px">
            {/* <Calendar /> */}
            <Calendar />
          </Box>
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
                Macros Tracker
              </Typography>
            </Box>
          </Box>
          <Box 
            height="350px"
            alignItems= "center" 
            justifyContent= "center" 
            display = "flex" 
            m = "0 30px">
            {/* <LineChart isDashboard={true} /> */}
            <Macros/>
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
