import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Chart/Header";
import Macros from "./Chart/macros";
import StatBox from "./Chart/StatBox";
import ExerciseBox from "./Chart/ExerciseBox";
import { useAuth } from "@/hooks/AuthProvider";
// import Calendar from "./Chart/Calendar";
import Calendar from "../Calendar/components/SmallCalendar";
import { Link } from "react-router-dom";
import BarChart from "../../components/calorieChart/calorie";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Experience from "../../components/Experience";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Interface from "../../components/Interface";
import { MantineProvider } from "@mantine/core";
import { CharacterAnimationsProvider } from "../../components/contexts/CharacterAnimations.jsx";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  const completedWorkouts = user.workouts.filter(workout => workout.isCompleted);
  const calculateBMI = (weight, height) => {
    // Check if weight and height are provided
    if (!weight || !height) {
        return "Please provide both weight and height for accurate BMI calculation.";
    }

    // Convert height to meters (if it's in centimeters)
    const heightInMeters = height / 100;

    // Calculate BMI using the formula: weight (kg) / (height (m) * height (m))
    const bmi = weight / (heightInMeters * heightInMeters);

    // Round BMI to two decimal places
    return parseFloat(bmi.toFixed(2));
};

const bmiResult = calculateBMI(user.weight, user.height);

  const handleDownload = () => {
    const dashboardElement = document.getElementById("dashboard-container");

    if (dashboardElement) {
      html2canvas(dashboardElement)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          // Define the maximum height of a single page
          const maxPageHeight = pdf.internal.pageSize.getHeight();

          // Check if the image height exceeds the maximum height of a single page
          if (imgHeight > maxPageHeight) {
            let currentY = 0;

            // Loop to create multiple pages
            while (currentY < imgHeight) {
              const pageHeight = Math.min(imgHeight - currentY, maxPageHeight);
              pdf.addPage();
              pdf.addImage(imgData, "PNG", 0, -currentY, imgWidth, imgHeight);
              currentY += pageHeight;
            }
          } else {
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          }
          pdf.save("dashboard-report.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };
  return (
    <div id="dashboard-container">
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Dashboard"
            subtitle={`Welcome to ${user.username}'s dashboard`}
          />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.accent.foreground,
                color: colors.secondary.default,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleDownload}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
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
            gridRow="span 5"
            backgroundColor={colors.background.default}
            p="30px"
            className="rounded-lg border"
            borderColor={colors.secondary.default}
          >
            <div style={{ overflow: "auto" }}>
              <MantineProvider>
                <CharacterAnimationsProvider>
                  <Canvas
                    style={{
                      position: "absolute",
                      zIndex: "10",
                      width: "23%",
                      height: "80%",
                      transform: "translate(0%, 10%)",
                    }}
                    shadows
                    camera={{ position: [0, 12, 18], fov: 95 }}
                  >
                    <Experience />
                  </Canvas>
                  <Interface />
                </CharacterAnimationsProvider>
              </MantineProvider>
            </div>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.background.default}
            p="30px"
            className="rounded-lg border"
            borderColor={colors.secondary.default}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              style={{ marginTop: "-10px" }}
            >
              User Profile
            </Typography>
            {/* sx={{ flexDirection: 'row' }} */}
            <Box
              height="250px"
              className="flex flex-col items-center justify-evenly"
            >
              <StatBox subtitle={user.age} title="Age" />
              <StatBox subtitle={user.height + " cm"} title="Height" />
              <StatBox subtitle={user.weight + " kg"} title="Weight" />
            </Box>
          </Box>

          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.background.default}
            overflow="auto"
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
              style={{ opacity: 1, backgroundColor: colors.background.default }}
            >
              <Typography variant="h5" fontWeight="600">
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
                    className="flex flex-col justify-evenly"
                    p="15px"
                  >
                    <ExerciseBox
                      subtitle={`${workout.day} - ${workout.month} - ${workout.year}`}
                      title={workout.name}
                      subsubtitle={workout.muscle}
                    />
                  </Box>
                );
              }
              return null; // Don't render the workout if it's not completed
            })}
          </Box>

          {/* <Box
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
          {/* <Calendar />
          </Box> 
        </Box> */}

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
              m="0 30px"
            >
              {/* <LineChart isDashboard={true} /> */}
              <Macros />
            </Box>
          </Box>

          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor={colors.background.default}
            overflow="auto"
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
              style={{ opacity: 1, backgroundColor: colors.background.default }}
            >
              <Typography variant="h5" fontWeight="600">
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
                  className="flex flex-col justify-evenly"
                  p="15px"
                >
                  <ExerciseBox
                    subtitle={`${workout.day} - ${workout.month} - ${workout.year}`}
                    title={workout.name}
                    subsubtitle={workout.muscle}
                  />
                </Box>
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="15px"
                component={Link}
                to="workout-planner"
              >
                <Typography variant="h5" fontWeight="600">
                  Start doing your workout now !!!
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            gridColumn="span 8"
            gridRow="span 4"
            // height="115%"
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
              alignItems="center"
              justifyContent="center"
              display="flex"
              m="0 30px"
            >
              <BarChart />
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
    </div>
  );
}
