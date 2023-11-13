import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@mui/material";
import { tokens } from "./theme";
import { useAuth } from "@/hooks/AuthProvider";
import { SettingsButton } from "@/components/macrosPageUI/settingsButton";
import NutritionixService from "@/services/NutritionixService";
import FoodCard from "@/components/macrosPageUI/foodCard";
import SummaryCard from "@/components/macrosPageUI/summaryCard";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "@/components/macrosPageUI/MealsTable/data-table";
import TableColumns from "@/components/macrosPageUI/MealsTable/columns";
import {
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import StatisticsSection from "@/components/macrosPageUI/statisticsSection";
import { bouncy } from "ldrs";

export default function MacrosPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  //query form states
  const [query, setQuery] = useState("");
  const [queryButton, setQueryButton] = useState(true);
  const [nutritionData, setNutritionData] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // for loader in query nutrition
  bouncy.register();

  // filter by today for Statistics
  const filterMealsByToday = (item) => {
    let now = format(new Date(), "PPP");
    const createdDate = format(new Date(item.createdAt), "PPP");
    // console.log(createdDate);
    // console.log(now);
    return createdDate === now;
  };

  // filter by this week for Statistics
  const filterMealsByWeek = (item) => {
    const cur = new Date();
    const first = startOfWeek(cur);
    const last = endOfWeek(cur);
    const createdDate = new Date(item.createdAt);

    return createdDate >= first && createdDate <= last;
  };

  // filter by this month for Statistics
  const filterMealsByMonth = (item) => {
    const cur = new Date();
    const first = startOfMonth(cur);
    const last = endOfMonth(cur);
    const createdDate = new Date(item.createdAt);

    return createdDate >= first && createdDate <= last;
  };

  // tracks state of query input
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // handle submit of query
  const handleQuerySubmit = async () => {
    let data = {
      query: query,
    };
    try {
      setIsLoading(true);
      const response = await NutritionixService.getNutrients(data);
      setNutritionData(response.data.foods);
      setTimeout(setIsLoading, 2000, false);
    } catch (err) {
      toast.error("Oops, something went wrong. Please try again later!");
      console.log(err);
    }
  };

  // handle disabled state of submit button
  useEffect(() => {
    if (query === "") {
      setQueryButton(true);
    } else {
      setQueryButton(false);
    }
  }, [query]);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
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
            <CardTitle
              style={{ color: colors.card.foreground, fontSize: "2.5rem" }}
            >
              Macros Tracker
            </CardTitle>
            <CardDescription style={{ color: colors.muted.foreground }}>
              Track your macros with confidence
            </CardDescription>
          </CardHeader>

          <div className="col-span-3 lg:col-span-4">
            <div className="h-full px-4 py-6 pt-0 lg:px-8">
              <Tabs defaultValue="stats" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList
                    style={{ backgroundColor: colors.background.default }}
                  >
                    <TabsTrigger value="stats" className="relative">
                      Stats
                    </TabsTrigger>
                    <TabsTrigger value="setting">Settings</TabsTrigger>
                  </TabsList>
                </div>

                {/* ////////////////// Statistics ////////////////// */}
                <TabsContent
                  value="stats"
                  className="border-none p-0 outline-none"
                >
                  <Separator
                    className="my-4"
                    style={{ backgroundColor: colors.muted.foreground }}
                  />
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
                      <StatisticsSection
                        meals={user.meals.filter(filterMealsByToday)}
                        limits={user.macros_setting}
                        title={"Today's"}
                      />
                    </TabsContent>
                    <TabsContent
                      value="week"
                      className="border-none p-0 outline-none"
                    >
                      <StatisticsSection
                        meals={user.meals.filter(filterMealsByWeek)}
                        limits={{
                          calorie: user.macros_setting.calorie * 7,
                          protein: user.macros_setting.protein * 7,
                          carbohydrate: user.macros_setting.carbohydrate * 7,
                          fat: user.macros_setting.fat * 7,
                        }}
                        title={"This Week's"}
                      />
                    </TabsContent>
                    <TabsContent
                      value="month"
                      className="border-none p-0 outline-none"
                    >
                      <StatisticsSection
                        meals={user.meals.filter(filterMealsByMonth)}
                        limits={{
                          calorie:
                            user.macros_setting.calorie *
                            getDaysInMonth(new Date()),
                          protein:
                            user.macros_setting.protein *
                            getDaysInMonth(new Date()),
                          carbohydrate:
                            user.macros_setting.carbohydrate *
                            getDaysInMonth(new Date()),
                          fat:
                            user.macros_setting.fat *
                            getDaysInMonth(new Date()),
                        }}
                        title={"This Month's"}
                      />
                    </TabsContent>
                  </Tabs>

                  {/* ////////////////// Statistics Children ////////////////// */}
                  <Separator
                    className="my-4 mt-12"
                    style={{ backgroundColor: colors.muted.foreground }}
                  />

                  <div className="col-span-3 lg:col-span-4">
                    <div className="h-full px-4 py-6 pt-0 lg:px-8">
                      <Tabs defaultValue="myMeals" className="h-full space-y-6">
                        <div className="space-between flex items-center">
                          <TabsList
                            style={{
                              backgroundColor: colors.background.default,
                            }}
                          >
                            <TabsTrigger value="myMeals" className="relative">
                              My Meals
                            </TabsTrigger>
                            <TabsTrigger value="query">Query</TabsTrigger>
                          </TabsList>
                        </div>

                        {/* ////////////////// My Meals ////////////////// */}
                        <TabsContent value="myMeals" className="">
                          <div className="flex items-center justify-center w-full">
                            <div className="space-y-1 w-full">
                              {/* <h2
                                className=" text-2xl font-semibold tracking-tight w-full"
                                style={{ color: colors.card.foreground }}
                              >
                                Meals
                              </h2> */}
                              <div className="container mx-auto py-5">
                                <DataTable
                                  columns={TableColumns.columns}
                                  data={user.meals}
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* ////////////////// Query Nutritionix ////////////////// */}
                        <TabsContent value="query" className="">
                          <div className="flex items-center justify-center w-full">
                            <div className="space-y-1 w-full">
                              <h2
                                className=" text-2xl font-semibold tracking-tight w-full"
                                style={{ color: colors.card.foreground }}
                              >
                                Nutritionix Database Query
                              </h2>
                              <div className="grid w-[30vw] gap-1.5">
                                <Label
                                  htmlFor="query-field"
                                  style={{ color: colors.card.foreground }}
                                >
                                  Enter you meal:
                                </Label>
                                <div className="text-with-button flex">
                                  <Textarea
                                    placeholder="e.g. Chicken rice with milo"
                                    id="query-field"
                                    maxLength="80"
                                    style={{ color: colors.card.foreground }}
                                    onChange={handleQueryChange}
                                  />
                                  <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-[5vw] h-full ml-2"
                                    onClick={handleQuerySubmit}
                                    disabled={queryButton}
                                  >
                                    Submit
                                  </Button>
                                </div>

                                <p
                                  className="text-sm text-muted-foreground"
                                  style={{ color: colors.muted.foreground }}
                                >
                                  Use comma to seperate more than 1 food
                                </p>
                              </div>

                              {/* ////////////////// Food Card ////////////////// */}
                              {isLoading ? null : (
                                <div>
                                  <div className="foodcard-wrapper grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 ">
                                    {nutritionData.map((item) => {
                                      return (
                                        <FoodCard
                                          key={item.ndb_no}
                                          data={item}
                                        />
                                      );
                                    })}
                                  </div>

                                  <Separator
                                    className="my-4"
                                    style={{
                                      backgroundColor: colors.muted.foreground,
                                    }}
                                  />
                                </div>
                              )}

                              {isLoading ? (
                                <div className="loading-wrapper min-h-[50vh] flex justify-center items-center">
                                  <l-bouncy
                                    size="45"
                                    speed="1.75"
                                    color="#3b82f6"
                                  ></l-bouncy>
                                </div>
                              ) : null}

                              {/* ////////////////// Query Summary ////////////////// */}
                              {isLoading ? null : (
                                <div className="summary-wrapper">
                                  {nutritionData.length >= 1 ? (
                                    <SummaryCard data={nutritionData} />
                                  ) : (
                                    <div className="min-h-[500px]"></div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </TabsContent>

                {/* ////////////////// Settings ////////////////// */}
                <TabsContent
                  value="setting"
                  className="border-none p-0 outline-none"
                >
                  <Separator
                    className="my-4"
                    style={{ backgroundColor: colors.muted.foreground }}
                  />
                  <div className="flex items-center justify-center">
                    <div className="space-y-1">
                      <Card
                        className="m-10 mt-0 mb-0"
                        style={{
                          backgroundColor: colors.background.children,
                          borderColor: colors.background.children,
                        }}
                      >
                        <CardHeader>
                          <CardTitle
                            style={{
                              color: colors.card.foreground,
                              fontSize: "1.5rem",
                            }}
                          >
                            Your Daily Limits
                          </CardTitle>
                          <CardDescription>
                            Change your daily nutrition limits here
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex">
                          {/* ////////////////// Calorie ////////////////// */}
                          <Card
                            className="m-2 w-[10vw]"
                            style={{
                              backgroundColor: colors.background.default,
                              borderColor: colors.muted.foreground,
                            }}
                          >
                            <CardHeader>
                              <CardTitle
                                style={{
                                  color: colors.card.foreground,
                                  fontSize: "1.2rem",
                                }}
                                className="text-center"
                              >
                                Calorie
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardTitle
                                style={{
                                  color: colors.primary.text,
                                  fontSize: "3vw",
                                }}
                                className="text-center"
                              >
                                {user.macros_setting.calorie}
                              </CardTitle>
                              <CardDescription className="text-center pb-5">
                                Cal
                              </CardDescription>
                            </CardContent>
                          </Card>

                          {/* ////////////////// Protein ////////////////// */}
                          <Card
                            className="m-2 w-[10vw]"
                            style={{
                              backgroundColor: colors.background.default,
                              borderColor: colors.muted.foreground,
                            }}
                          >
                            <CardHeader>
                              <CardTitle
                                style={{
                                  color: colors.card.foreground,
                                  fontSize: "1.2rem",
                                }}
                                className="text-center"
                              >
                                Proteins
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardTitle
                                style={{
                                  color: colors.primary.text,
                                  fontSize: "3vw",
                                }}
                                className="text-center"
                              >
                                {user.macros_setting.protein}
                              </CardTitle>
                              <CardDescription className="text-center pb-5">
                                grams
                              </CardDescription>
                            </CardContent>
                          </Card>

                          {/* ////////////////// Carbs ////////////////// */}
                          <Card
                            className="m-2 w-[10vw]"
                            style={{
                              backgroundColor: colors.background.default,
                              borderColor: colors.muted.foreground,
                            }}
                          >
                            <CardHeader>
                              <CardTitle
                                style={{
                                  color: colors.card.foreground,
                                  fontSize: "1.2rem",
                                }}
                                className="text-center"
                              >
                                Carbohydrates
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardTitle
                                style={{
                                  color: colors.primary.text,
                                  fontSize: "3vw",
                                }}
                                className="text-center"
                              >
                                {user.macros_setting.carbohydrate}
                              </CardTitle>
                              <CardDescription className="text-center pb-5">
                                grams
                              </CardDescription>
                            </CardContent>
                          </Card>

                          {/* ////////////////// Fats ////////////////// */}
                          <Card
                            className="m-2 w-[10vw]"
                            style={{
                              backgroundColor: colors.background.default,
                              borderColor: colors.muted.foreground,
                            }}
                          >
                            <CardHeader>
                              <CardTitle
                                style={{
                                  color: colors.card.foreground,
                                  fontSize: "1.2rem",
                                }}
                                className="text-center"
                              >
                                Fats
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardTitle
                                style={{
                                  color: colors.primary.text,
                                  fontSize: "3vw",
                                }}
                                className="text-center"
                              >
                                {user.macros_setting.fat}
                              </CardTitle>
                              <CardDescription className="text-center pb-5">
                                grams
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                          <SettingsButton />
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
