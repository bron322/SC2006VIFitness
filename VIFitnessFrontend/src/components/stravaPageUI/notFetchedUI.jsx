import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
import { Button } from "../ui/button";
import { grid } from "ldrs";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "@/hooks/AuthProvider";

export default function NotFetchedUI(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  grid.register();

  return (
    <>
      <div
        className="h-full min-h-[80vh] pt-2 flex flex-col justify-center items-center"
        style={{ backgroundColor: colors.background.children }}
      >
        <l-grid size="70" speed="2" color="#4287f5"></l-grid>
        {!props.noResult ? (
          <h1 style={{ color: colors.accent.foreground }} className="my-5">
            Fetch your activities from Strava...
          </h1>
        ) : (
          <h1 style={{ color: colors.accent.foreground }} className="my-5">
            Oh no! You have no recent activities on Strava. Please try again
            after posting an activity on Strava!
          </h1>
        )}

        <div className="flex ">
          <Button
            variant="outline2"
            size="sm"
            onClick={props.onClick}
            style={{ color: colors.accent.foreground }}
            className="ml-8"
          >
            Fetch Strava Data
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon
                  className="mx-2"
                  style={{ color: colors.accent.foreground }}
                  sx={{ height: "17px" }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <span>
                  Click this button to fetch your activities from Strava.
                </span>
                <br />
                <span>
                  Only activities from the recent 3 days will be fetched.
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}
