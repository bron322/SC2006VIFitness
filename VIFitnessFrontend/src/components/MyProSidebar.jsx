import React, { useState, useEffect } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { NavLink, Form } from "react-router-dom";
import { tokens } from "../routes/theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import User from "../components/styles/photos/user.png";
import Logo from "../components/styles/photos/LOGO.png";
import Profile from "../components/styles/photos/profilepic.jpg";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../hooks/AuthProvider";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import APIDataService from "@/services/APIDataService";
import toast, { Toaster } from "react-hot-toast";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [hover, setHover] = useState(false);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.secondary.foreground,
        backgroundColor: hover
          ? colors.muted.hover // button color when hover
          : selected === title
            ? colors.primary.active // button color when active
            : colors.background.default, // button color for default
        transitionDuration: "0.3s",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<NavLink to={to} />}
      className="pb-2 flex justify-center "
      // Set hover state for the button
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      rootStyles={{
        [".ps-menu-icon"]: {
          color: hover
            ? colors.accent.foreground // button color when hover
            : selected === title
              ? colors.destructive.foreground // button color when active
              : colors.muted.foreground, // button color for default
        },
      }}
    >
      {/* Text for Menu Items */}
      <Typography
        color={
          hover
            ? colors.accent.foreground // text color for hover
            : selected === title
              ? colors.destructive.foreground // text color for active
              : colors.muted.foreground // text color for default
        }
        fontWeight="medium"
      >
        {title}
      </Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const { logout, user, setUser } = useAuth();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [postImage, setPostImage] = useState({ myFile: '' })

  const createPost = async (newImage) => {
    const data = {
      username: user.username,
      profilepic: newImage,
    }
    try {
      const response = await APIDataService.uploadProfilePic(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Profile pic uploaded!");
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Try again with a picture with smaller size!");
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage.myFile);
    console.log("Uploaded");
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage({ ...postImage, myFile: base64 })
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <Box // this is content wrapper for the sidebar
        sx={{
          position: "sticky",
          display: "flex",
          height: "100vh",
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
        className={`border-${sidebarRTL ? "l" : "r"}-2 p-2 justify-center`}
        borderColor={colors.secondary.default}
        backgroundColor={colors.background.default}
      >
        <Sidebar // main sidebar object
          breakPoint="md"
          rtl={sidebarRTL}
          backgroundColor={colors.background.default}
          image={sidebarImage}
          style={{
            height: "100%",
            top: "auto",
            position: "sticky",
            padding: "0rem",
            margin: "0rem",
            border: "0rem", // this get rids of the white line around the sidebar container
          }}
        >
          <Menu
            iconshape="square"
            menuItemStyles={{
              button: {
                borderRadius: "1rem",
                height: "2.3rem",
                width: "90%",
              },
            }}
          >
            <MenuItem
              icon={
                collapsed ? (
                  <MenuOutlinedIcon onClick={() => collapseSidebar()} />
                ) : sidebarRTL ? (
                  <SwitchLeftOutlinedIcon
                    onClick={() => setSidebarRTL(!sidebarRTL)}
                  />
                ) : (
                  <SwitchRightOutlinedIcon
                    onClick={() => setSidebarRTL(!sidebarRTL)}
                  />
                )
              }
              style={{
                margin: "10px 0 20px 0",
                color: colors.accent.foreground,
                backgroundColor: colors.background.default,
              }}
              className="flex justify-center"
            >
              {/* the top layer: switch button, collapse button and logo */}
              {!collapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="5px"
                >
                  <img
                    alt="logo"
                    width="90px"
                    height="90px"
                    src={Logo}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      filter: "invert(75)",
                    }}
                  />

                  <IconButton
                    onClick={
                      broken ? () => toggleSidebar() : () => collapseSidebar()
                    }
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {/* Avatar + username */}
            {!collapsed && (
              <Box mb="25px">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    "& .avater-image": {
                      backgroundColor: colors.background.default,
                    },
                  }}
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                >
                  {/* Profile Picture */}
                  <img
                    className="avatar-image"
                    alt="profile user"
                    width="200px"
                    height="200px"
                    src={postImage.myFile !== '' ? postImage.myFile : (user.profilePic !== "nil" ? user.profilePic : Profile)}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />

                  {/* Form */}
                  {isHovered && (
                    <Form onSubmit={handleSubmit}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '130%',
                        height: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <input
                        type="file"
                        label="Image"
                        name="myFile"
                        id="file-upload"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => handleFileUpload(e)}
                      />
                      {/* Submit button */}
                      <button
                        type="submit"
                        style={{
                          backgroundColor: '#4CAF50', /* Green background color */
                          border: 'none', /* Remove border */
                          color: 'white', /* White text color */
                          padding: '5px 10px', /* Padding */
                          textAlign: 'center', /* Center text */
                          textDecoration: 'none', /* Remove underline */
                          display: 'inline-block', /* Make it an inline block */
                          fontSize: '16px', /* Set font size */
                          borderRadius: '4px', /* Rounded corners */
                          cursor: 'pointer', /* Cursor on hover */
                        }}
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Box>

                {/* ////////////////// Username ////////////////// */}
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.accent.foreground}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user.username}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box className="flex-verticle justify-items-center align-center">
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.secondary.foreground}
                sx={{ m: "15px 20px 5px 20px" }}
              >
                Pages
              </Typography>
              <Item
                title="Workout Plan"
                to="workout-planner"
                icon={<FitnessCenterIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Macros Tracker"
                to="macros-tracker"
                icon={<RestaurantIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Strava"
                to="strava"
                icon={<DirectionsRunIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Calendar"
                to="calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Profile Settings"
                to="form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* <Item
                title="FAQ Page"
                to="faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}
            </Box>
            <div className="flex-col w-full absolute bottom-0 justify-center align-middle">
              <Separator
                style={{
                  backgroundColor: colors.muted.foreground,
                }}
              />
              <LogoutButton onClick={handleLogout} collapsed={collapsed} />
            </div>
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
};

export default MyProSidebar;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}