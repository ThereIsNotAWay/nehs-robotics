import Header from "./Header";
import Footer from "./Footer";
import User from "./User";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <User />
            <Footer />
        </div>
    );
};

export default Layout;