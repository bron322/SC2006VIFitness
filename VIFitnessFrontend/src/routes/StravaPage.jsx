import { useAuth } from "@/hooks/AuthProvider";
import { useTheme } from "@mui/material";
import { tokens } from "./theme";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsSection from "@/components/macrosPageUI/statisticsSection";
import DataTable from "@/components/macrosPageUI/MealsTable/data-table";
import TableColumns from "@/components/macrosPageUI/MealsTable/columns";
import { Button } from "@/components/ui/button";
import InfoIcon from "@mui/icons-material/Info";
import NotConnectedUI from "@/components/stravaPageUI/notConnectedUI";
import NotFetchedUI from "@/components/stravaPageUI/notFetchedUI";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import StravaAPIService from "@/services/StravaAPIService";
import { ring } from "ldrs";
import APIDataService from "@/services/APIDataService";
import calculateCalorie from "@/utils/stravaCalorieCalculator";
import StravaStats from "@/components/stravaPageUI/stravaStats";
import {
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import StravaDataTable from "@/components/stravaPageUI/stravaData-table";
import StravaTableColumns from "@/components/stravaPageUI/stravaColumns";

export default function StravaPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, setUser } = useAuth();
  const [showNoResult, setShowNoResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  ring.register();

  //reduce array with map
  const reductionMap = (activity) => {
    const reducedActivity = {
      name: activity.name,
      type: activity.sport_type,
      date: new Date(activity.start_date),
      distance: activity.distance,
      calorieBurned: calculateCalorie(
        activity.sport_type,
        activity.distance,
        activity.moving_time
      ),
      duration: activity.moving_time,
    };
    return reducedActivity;
  };

  //fetch strava data
  const handleFetchStrava = async () => {
    setIsLoading(true);
    const date = new Date();
    date.setDate(date.getDate() - 3);
    // console.log(date);
    try {
      const data = {
        date: date.getTime() / 1000,
        accessToken: user.strava_data.accessToken,
      };
      //Fetch athlete data
      const response = await StravaAPIService.getAthleteActivities(data);
      if (response.data.length === 0) {
        setShowNoResult(true);
        setTimeout(setIsLoading, 1000, false);
      } else {
        // console.log(response.data);
        setTimeout(setIsLoading, 1000, false);
        const data = {
          email: user.email,
          activities: response.data.map(reductionMap),
        };
        try {
          //If got activities, then update to database
          const response = await APIDataService.updateStravaActivities(data);
          if (Object.keys(response.data).length !== 0) {
            setUser(response.data);
            toast.success("Activities fetched!");
          } else {
            toast.error("Something went wrong. Try again later!");
          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong. Try again later!");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again later!");
    }
  };

  // filter by today for Statistics
  const filterActivitiesByToday = (item) => {
    let now = format(new Date(), "PPP");
    const createdDate = format(new Date(item.date), "PPP");
    // console.log(createdDate);
    // console.log(now);
    return createdDate === now;
  };

  // filter by this week for Statistics
  const filterActivitiesByWeek = (item) => {
    const cur = new Date();
    const first = startOfWeek(cur);
    const last = endOfWeek(cur);
    const createdDate = new Date(item.date);

    return createdDate >= first && createdDate <= last;
  };

  // filter by this month for Statistics
  const filterActivitiesByMonth = (item) => {
    const cur = new Date();
    const first = startOfMonth(cur);
    const last = endOfMonth(cur);
    const createdDate = new Date(item.date);

    return createdDate >= first && createdDate <= last;
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {!Object.hasOwn(user, "strava_data") ? (
        <NotConnectedUI />
      ) : (
        <div
          className="macros-page-wrapper h-full min-h-screen pt-2"
          style={{ backgroundColor: colors.background.children }}
        >
          <Card
            className="m-10 mb-0"
            style={{
              backgroundColor: colors.background.children,
              borderColor: colors.background.default,
            }}
          >
            <CardHeader>
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 mr-2"
                  role="img"
                  viewBox="0 0 24 24"
                  fill="#fc4c02"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Strava</title>
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
              </div>

              <CardTitle
                style={{ color: colors.card.foreground, fontSize: "2.5rem" }}
              >
                Strava Data
              </CardTitle>
              <CardDescription style={{ color: colors.muted.foreground }}>
                Track your Strava Data here
              </CardDescription>
              {Object.hasOwn(user, "strava_activities") ? (
                <div className="flex justify-end">
                  {isLoading ? (
                    <Button
                      variant="outline2"
                      size="sm"
                      style={{ color: colors.accent.foreground }}
                      disabled
                    >
                      <div className="min-w-[85px] mt-1">
                        <l-ring
                          size="20"
                          stroke="3"
                          bg-opacity="0"
                          speed="2.4"
                          color="#4287f5"
                        ></l-ring>
                      </div>
                    </Button>
                  ) : (
                    <Button
                      variant="outline2"
                      size="sm"
                      style={{ color: colors.accent.foreground }}
                      onClick={handleFetchStrava}
                    >
                      Fetch Strava Data
                    </Button>
                  )}

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
                          This will only fetch Strava activities in the last 3
                          days
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : null}
            </CardHeader>
            <div className="h-full px-4 py-6 pt-0 lg:px-8">
              <Separator
                className="my-4"
                style={{ backgroundColor: colors.muted.foreground }}
              />

              {/* ////////////////// Statistics ////////////////// */}
              {isLoading ? (
                <div
                  className="h-full min-h-[80vh] pt-2 flex flex-col justify-center items-center"
                  style={{ backgroundColor: colors.background.children }}
                >
                  <l-ring
                    size="40"
                    stroke="5"
                    bg-opacity="0"
                    speed="2.4"
                    color="#4287f5"
                  ></l-ring>
                </div>
              ) : !Object.hasOwn(user, "strava_activities") ? (
                <NotFetchedUI
                  onClick={handleFetchStrava}
                  noResult={showNoResult}
                />
              ) : (
                <>
                  <Tabs defaultValue="today">
                    <div className="space-between flex items-center justify-center mr-12">
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
                      <StravaStats
                        activities={user.strava_activities.filter(
                          filterActivitiesByToday
                        )}
                        title={"Today's"}
                      />
                    </TabsContent>
                    <TabsContent
                      value="week"
                      className="border-none p-0 outline-none"
                    >
                      <StravaStats
                        activities={user.strava_activities.filter(
                          filterActivitiesByWeek
                        )}
                        title={"Today's"}
                      />
                    </TabsContent>
                    <TabsContent
                      value="month"
                      className="border-none p-0 outline-none"
                    >
                      <StravaStats
                        activities={user.strava_activities.filter(
                          filterActivitiesByMonth
                        )}
                        title={"Today's"}
                      />
                    </TabsContent>
                  </Tabs>

                  <Separator
                    className="my-4 mt-12"
                    style={{ backgroundColor: colors.muted.foreground }}
                  />
                  <div className="h-full px-4 py-6 pt-0 lg:px-8">
                    <div className="flex items-center justify-center w-full">
                      <div className="space-y-1 w-full">
                        <div className="container mx-auto py-5">
                          <StravaDataTable
                            columns={StravaTableColumns.columns}
                            data={user.strava_activities}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
