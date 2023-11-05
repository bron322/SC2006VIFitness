import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
import { LogOut } from "lucide-react";

export default function LogoutButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size={props.collapsed ? "collapsed" : "logout"}
          styles={{ backgroundColor: colors.destructive.default }}
          className="flex justify-items-start"
        >
          <LogOut
            color={colors.secondary.default}
            className="justify-items-start"
          />
          {!props.collapsed && "Log out"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-700">
            Logout Confirmation
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={props.onClick}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
