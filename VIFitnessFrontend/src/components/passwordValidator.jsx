import { Typography } from "@mui/material";
import { CheckCircle2, XCircle } from "lucide-react";

export default function PasswordValidator(props) {
  const containsNumber = (s) => {
    return /[a-zA-Z]/.test(s) && /\d/.test(s);
  };

  const containsSpecial = (s) => {
    return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(s);
  };

  const containsUppercaseLowercase = (s) => {
    return /[a-z]/.test(s) && /[A-Z]/.test(s);
  };
  return (
    <>
      {props.newPassword.length === 0 && !props.showContent ? null : (
        <>
          {props.newPassword.length > 6 ? (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#0e8a37"}
              >
                Length of password must be more than 6 characters
              </Typography>
              <CheckCircle2 className="ml-5 w-4" style={{ color: "#0e8a37" }} />
            </div>
          ) : (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#750e0e"}
              >
                Length of password must be more than 6 characters
              </Typography>

              <XCircle className="ml-5 w-4" style={{ color: "#750e0e" }} />
            </div>
          )}
          {containsNumber(props.newPassword) ? (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#0e8a37"}
              >
                Your password must contain atleast 1 number and 1 alphabet
              </Typography>
              <CheckCircle2 className="ml-5 w-4" style={{ color: "#0e8a37" }} />
            </div>
          ) : (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#750e0e"}
              >
                Your password must contain atleast 1 number and 1 alphabet
              </Typography>

              <XCircle className="ml-5 w-4" style={{ color: "#750e0e" }} />
            </div>
          )}
          {containsSpecial(props.newPassword) ? (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#0e8a37"}
              >
                Your password must contain atleast 1 special character
              </Typography>
              <CheckCircle2 className="ml-5 w-4" style={{ color: "#0e8a37" }} />
            </div>
          ) : (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#750e0e"}
              >
                Your password must contain atleast 1 special character
              </Typography>

              <XCircle className="ml-5 w-4" style={{ color: "#750e0e" }} />
            </div>
          )}
          {containsUppercaseLowercase(props.newPassword) ? (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#0e8a37"}
              >
                Your password must contain atleast 1 uppercase and 1 lowercase
                character
              </Typography>
              <CheckCircle2 className="ml-5 w-4" style={{ color: "#0e8a37" }} />
            </div>
          ) : (
            <div className="flex align-center mb-0">
              <Typography
                level="body-sm"
                sx={{ fontSize: "0.8rem", paddingTop: "2px" }}
                color={"#750e0e"}
              >
                Your password must contain atleast 1 uppercase and 1 lowercase
                character
              </Typography>

              <XCircle className="ml-5 w-4" style={{ color: "#750e0e" }} />
            </div>
          )}
        </>
      )}
    </>
  );
}
