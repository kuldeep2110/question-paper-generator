import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface SharedLayoutProps {}

const SharedLayout: FC<SharedLayoutProps> = ({}) => {
  return (
    <main className="bg-[#23272F] min-h-screen text-white font-sans">
      <Navbar />
      <section>
        <div className="mx-auto max-w-6xl p-2 px-2 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default SharedLayout;
