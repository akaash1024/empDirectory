import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import {Footer} from "./Footer/Footer"




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
