// rafc
import { Header, Footer } from "../ui";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
      {/* Footer */}
    </div>
  );
};
