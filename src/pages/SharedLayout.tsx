import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface SharedLayoutProps {}

const SharedLayout: FC<SharedLayoutProps> = ({}) => {
  return (
    <main className="bg-gradient-to-r from-neutral-800 via-gray-900 to-fuchsia-950 min-h-screen w-screen">
      <Navbar />
      <section className="text-white h-[90vh]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default SharedLayout;
