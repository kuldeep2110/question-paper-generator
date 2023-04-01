import { FC } from "react";
import { Link } from "react-router-dom";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <div>
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
