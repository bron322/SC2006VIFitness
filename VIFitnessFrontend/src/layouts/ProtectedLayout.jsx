import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function ProtectedLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    console.log("Unauthorised");
    return <Navigate to="/" />;
  }

  const SignoutAction = () => {
    logout();
  };

  return (
    <>
      <h1>This is Protected Layout</h1>
      <button onClick={SignoutAction}>Sign out</button>
      <Outlet />
    </>
  );
}
