import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Chart/Header";
import Macros from "./Chart/macros";
import StatBox from "./Chart/StatBox";
import ExerciseBox from "./Chart/ExerciseBox";
import { useAuth } from "@/hooks/AuthProvider";
import React, { useState } from "react";
// import Calendar from "./Chart/Calendar";
import Calendar from "../Calendar/components/SmallCalendar";
import { Link } from "react-router-dom";
import BarChart from "../../components/calorieChart/calorie";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import Checkbox from '@mui/material/Checkbox';
// import APIDataService from "@/services/APIDataService";
// import toast from "react-hot-toast";
import Checkbox from "../../components/checkbox";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Experience from "../../components/Experience";
import { Canvas } from "@react-three/fiber";

import Interface from "../../components/Interface";
import { MantineProvider } from "@mantine/core";
import { CharacterAnimationsProvider } from "../../components/contexts/CharacterAnimations.jsx";

export default function Dashboard() {
  const [expandedMuscle, setExpandedMuscle] = useState(null);
  const toggleExpand = (muscle) => {
    setExpandedMuscle((prev) => (prev === muscle ? null : muscle));
  };

  const muscleGroups = {};

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, setUser } = useAuth();
  const completedWorkouts = user.workouts.filter(
    (workout) => workout.isCompleted
  );
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

  // Aggregate exercises for each muscle part
  completedWorkouts.forEach((workout) => {
    const muscle = workout.muscle;
    if (!muscleGroups[muscle]) {
      muscleGroups[muscle] = [];
    }
    muscleGroups[muscle].push(workout);
  });

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

  // const handleMarkAsCompleted = async (e, workout) => {
  //   e.preventDefault();
  //   console.log(workout);
  //   const data = {
  //     username: user.username,
  //     date: workout.createdAt,
  //   };

  //   try {
  //     const response = await APIDataService.updateExercise(data);
  //     if (Object.keys(response.data).length !== 0) {
  //       setUser(response.data);
  //       toast.success("Exercise mark as completed!");
  //       console.log("Test");

  //     } else {
  //       toast.error("Something went wrong. Try again later!");
  //     }
  //   } catch (err) {
  //     console.log("test");
  //     console.error("Error updating exercise:", err.message);
  //   }
  //   setShowDialog(e.target.checked);
  // };

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
                      height: "75%",
                      transform: "translate(0%, 10%)",
                      border: "1px",
                      borderStyle: "double",
                      borderRadius: "10px",
                    }}
                    shadows
                    camera={{ position: [0, 8, 25], fov: 95 }}
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
              <StatBox subtitle={bmiResult} title="BMI" />
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
                const label = {
                  inputProps: { "aria-label": `${workout.name}` },
                };
                return (
                  <Box
                    key={`${i}-${workout.name}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`1px solid ${colors.secondary.default}`}
                    className="flex flex-row justify-evenly align-middle"
                    p="10px"
                  >
                    {/* <Checkbox {...label}
                      onChange={(e) => handleMarkAsCompleted(e, workout)}
                    /> */}
                    <Checkbox data={workout} />
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
              <>
                {Object.keys(muscleGroups).map((muscle, i) => (
                  <Box
                    key={`${i}-${muscle}`}
                    // display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`1px solid ${colors.secondary.default}`}
                    className="flex-col"
                    p="15px"
                  >
                    <div
                      onClick={() => toggleExpand(muscle)}
                      style={{ cursor: "pointer" }}
                      className="flex justify-between w-full"
                    >
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {muscle}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        Frequency: {muscleGroups[muscle].length}
                      </Typography>
                    </div>
                    {expandedMuscle === muscle && (
                      <div>
                        {/* Render exercise details, you can use ExerciseBox or other components */}
                        {muscleGroups[muscle].map((workout, index) => (
                          <ExerciseBox
                            key={index}
                            subtitle={`${workout.day} - ${workout.month} - ${workout.year}`}
                            title={workout.name}
                          />
                        ))}
                      </div>
                    )}
                  </Box>
                ))}
              </>
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
