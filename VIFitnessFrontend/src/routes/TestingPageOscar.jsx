import { Link } from "react-router-dom";

export default function TestPage() {
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
    </>
  );
}
