import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import "./styles/PublicLayout.css";

export default function PublicLayout() {
  const { user, setUser } = useAuth();
  const [params, setParams] = useSearchParams();

  if (params.get("token") === null) {
    if (user) {
      return <Navigate to="/user" />;
    }
  } else {
    setUser("");
  }

  return (
    <>
      <Outlet />
    </>
  );
}
