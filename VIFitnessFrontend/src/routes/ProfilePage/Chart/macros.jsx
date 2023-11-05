import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useAuth } from "@/hooks/AuthProvider";

import {
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import SmallStats from "./smallstats";

function macros(){
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const { user } = useAuth();

//   //query form states
//   const [query, setQuery] = useState("");
//   const [queryButton, setQueryButton] = useState(true);
//   const [nutritionData, setNutritionData] = useState([]);

  // filter by today for Statistics
  const filterMealsByToday = (item) => {
    let now = format(new Date(), "PPP");
    const createdDate = format(new Date(item.createdAt), "PPP");
    // console.log(createdDate);
    console.log(now);
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

//   // handle submit of query
//   const handleQuerySubmit = async () => {
//     let data = {
//       query: query,
//     };
//     try {
//       const response = await NutritionixService.getNutrients(data);
//       setNutritionData(response.data.foods);
//     } catch (err) {
//       toast.error("Oops, something went wrong. Please try again later!");
//       console.log(err);
//     }
//   };

  // handle disabled state of submit button
//   useEffect(() => {
//     if (query === "") {
//       setQueryButton(true);
//     } else {
//       setQueryButton(false);
//     }
//   }, [query]);

    return(
        <Tabs defaultValue="today">
            <div className="space-between flex items-center justify-center w-full">
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
                        <Box >
                      <SmallStats
                        meals={user.meals.filter(filterMealsByToday)}
                        limits={user.macros_setting}
                        title={"Today's"}
                      />
                      </Box>
                    </TabsContent>
                    <TabsContent
                      value="week"
                      className="border-none p-0 outline-none " m = "20px 0 10px -10px"
                    >
                      <SmallStats
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
                      <SmallStats
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
    )
}
export default macros;