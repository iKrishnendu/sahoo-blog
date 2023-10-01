import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <main>
      <Navbar />
      <div className="max-w-4xl mx-auto md:w-full p-3">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
