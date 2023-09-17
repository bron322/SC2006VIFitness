import { Link } from "react-router-dom";

// This is Lebron's sign up page

export default function TestSignUpLebron() {
  const handlesubmit = (e) => {
    console.log("test");
  };

  return (
    <>
      <div className="test-page-wrapper">
        <h1>This is test page</h1>
      </div>

      <Link to={"/user"} onClick={handlesubmit}>
        Login
      </Link>

      <Link to={"/register"} onClick={handlesubmit}>
        Sign Up
      </Link>
    </>
  );
}
