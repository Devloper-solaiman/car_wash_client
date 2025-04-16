import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import Footer from "../footer/Footer";
import ContactHeader from "../navigation/ContactHeader";

type TMainLayoutProps = object;

const MainLayout: FC<TMainLayoutProps> = () => {
  return (
    <main>
      <ContactHeader />
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
