import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PieChartMacros from "@/components/piechart";


function macros(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <div className="stats-content-wrapper flex ">
            <div className="pie-wrapper mr-[5vw] ">
                <PieChartMacros />
            </div>

            <div className="right-stats-wrapper flex flex-col justify-evenly">
                <div className="bar-wrapper flex items-center">
                    <Progress
                    id="calorie-bar"
                    innercolor={colors.progress.default}
                    outercolor={colors.progress.foreground}
                    value={33}
                    className="w-[30vh]"
                    />
                    <Label
                    htmlFor="calorie-bar"
                    style={{ color: colors.accent.foreground }}
                    className="ml-2"
                    >
                        Calorie
                    </Label>
                </div>

                <div className="bar-wrapper flex items-center">
                    <Progress
                    id="protein-bar"
                    innercolor={colors.progress.default}
                    outercolor={colors.progress.foreground}
                    value={33}
                    className="w-[30vh]"
                    />
                    <Label
                    htmlFor="protein-bar"
                    style={{ color: colors.accent.foreground }}
                    className="ml-2"
                    >
                    Protein
                    </Label>
                </div>

                <div className="bar-wrapper flex items-center">
                    <Progress
                    id="carbs-bar"
                    innercolor={colors.progress.default}
                    outercolor={colors.progress.foreground}
                    value={33}
                    className="w-[30vh]"
                    />
                    <Label
                    htmlFor="carbs-bar"
                    style={{ color: colors.accent.foreground }}
                    className="ml-2"
                    >
                        Carbohydrates
                    </Label>
                </div>

                <div className="bar-wrapper flex items-center">
                    <Progress
                    id="fats-bar"
                    innercolor={colors.progress.default}
                    outercolor={colors.progress.foreground}
                    value={33}
                    className="w-[30vh]"
                    />
                    <Label
                    htmlFor="fats-bar"
                    style={{ color: colors.accent.foreground }}
                    className="ml-2"
                    >
                        Fats
                    </Label>
                </div>
            </div>
        </div>
    )
}
export default macros;