import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface SharedLayoutProps {}

const SharedLayout: FC<SharedLayoutProps> = ({}) => {
  return (
    <>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default SharedLayout;
