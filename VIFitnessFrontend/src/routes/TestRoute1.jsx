import { useNavigation } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function TestRoute1() {
  const { logout } = useAuth();
  const navigate = useNavigation();

  const signout = () => {
    logout();
  };
  return (
    <>
      <h1>This is test route 1</h1>
      <button onClick={signout}>Sign out</button>
    </>
  );
}
