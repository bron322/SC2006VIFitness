import { Separator } from "@/components/ui/separator";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
export default function Footer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <div className="min-h-[30vh] bg-black ">
        <div className="flex justify-center pt-5">
          <Separator
            className="w-[90vw]"
            style={{ backgroundColor: "#6e6e6e" }}
          />
        </div>
      </div>
    </>
  );
}
