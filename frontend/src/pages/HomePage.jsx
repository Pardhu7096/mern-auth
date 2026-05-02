import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
    };

  return (
    <div>
      <h1>HomePage</h1>
      <p>Welcome you are logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default HomePage;
