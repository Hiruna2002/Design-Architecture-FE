import Footer from "../Common/Footer"
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
    return(
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );  
};

export default UserLayout