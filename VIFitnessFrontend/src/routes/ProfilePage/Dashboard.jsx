import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockTransactions } from "./data/mockData";
import Header from "./Chart/Header";
import LineChart from "./Chart/Line";
import Calendar from "./Chart/Calendar";
import { useState } from "react";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          ></Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.background.default}
          className="rounded-lg border"
          borderColor={colors.secondary.default}
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
          <Box height="250px">
            <Calendar />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.background.default}
          className="rounded-lg border"
          borderColor={colors.secondary.default}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
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
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.muted.foreground}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box></Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
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
        </Box>
      </Box>
    </Box>
  );
}
