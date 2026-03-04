import { Outlet } from "react-router-dom";
import Navbar from "../Common/NavBar";
import Footer from "../Common/Footer";

const UserLayout: React.FC = () => {
    return(
        <>
            <main>
                <Navbar />
                <Outlet />
                <Footer />
            </main>
        </>
    );  
};

export default UserLayout