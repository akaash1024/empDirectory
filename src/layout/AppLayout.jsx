import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/FOoter";

export const AppLayout = () => {
  return (
    <>
      <Header />

      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
