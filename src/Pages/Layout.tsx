import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RoutLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar bg="bg-gradient-to-r from-black to-[#371F5A]" />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RoutLayout;
