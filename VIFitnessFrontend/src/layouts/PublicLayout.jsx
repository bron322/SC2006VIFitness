import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import "./styles/PublicLayout.css";

export default function PublicLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/user" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
