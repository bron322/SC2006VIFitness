import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { grid } from "ldrs";

export default function NotConnectedUI() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  grid.register();

  const handleClick = () => {
    navigate("/user/form");
  };
  return (
    <>
      <div
        className="macros-page-wrapper h-full min-h-screen pt-2 flex flex-col justify-center items-center"
        style={{ backgroundColor: colors.background.children }}
      >
        <l-grid size="70" speed="2" color="#4287f5"></l-grid>

        <h1 className="my-5">Connect to Strava to use this feature...</h1>
        <Button variant="outline2" size="sm" onClick={handleClick}>
          Go to settings
        </Button>
      </div>
    </>
  );
}
