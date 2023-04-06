import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/contexts/AuthContext";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const { currentUser } = useAuth();

  if (currentUser)
    return (
      <div>
        <h1>Home Page</h1>
        <p>You are logged in as: {currentUser.email}</p>
        <p>
          You can access the dashboard: <Link to="/dashboard">Dashboard</Link>
        </p>
      </div>
    );

  return (
    <div className="">
      <h1>Home Page</h1>
      <p>
        Login to continue: <Link to="/login">Login</Link>
      </p>
      <p>
        Else you cannot access the dashboard:{" "}
        <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
};

export default Home;
