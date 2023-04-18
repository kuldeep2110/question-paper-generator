import { notifications } from "@mantine/notifications";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/contexts/AuthContext";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error: any) {
      console.log("log out error: ", error);
      notifications.show({
        title: "Error",
        message: "Failed to log out",
        color: "red",
      });
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
      <h2>You are logged in as: {currentUser?.email}</h2>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};

export default Dashboard;
