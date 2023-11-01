import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
import { Separator } from "../ui/separator";
import Semircirclebar from "../semircirclebar";

export default function SummaryCard(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      className="w-100% min-w-[25vw] col-span-1 "
      style={{
        backgroundColor: colors.background.children,
        borderColor: colors.background.children,
      }}
    >
      <CardHeader>
        <CardTitle
          className="mb-2"
          style={{ color: colors.card.foreground, fontSize: "2rem" }}
        >
          Summary
        </CardTitle>
        <CardDescription style={{ color: colors.muted.foreground }}>
          The total nutritional value of your meal
        </CardDescription>
        <Separator
          className="mt-7"
          style={{ backgroundColor: colors.muted.default }}
        />
      </CardHeader>
      <CardContent>
        <div className="semi-bar-wrapper flex justify-center">
          <Semircirclebar data={props.data} />
        </div>
      </CardContent>
    </Card>
  );
}
