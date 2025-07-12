import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Outlet, useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();
  const isQuizPage = location.pathname === "/quiz";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isQuizPage && <Footer />}
    </div>
  );
}