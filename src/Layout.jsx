import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = () => {
  const pageTitle = useSelector((state) => state.pageTitle);
  console.log(pageTitle);
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
