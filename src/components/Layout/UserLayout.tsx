import { Outlet } from "react-router-dom";
import Navbar from "../Common/NavBar";
import Footer from "../Common/Footer";

interface UserLayoutProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserLayout({isLoggedIn, setIsLoggedIn }: UserLayoutProps) {

// const UserLayout: React.FC<UserLayoutProps> = ({ isLoggedIn, setIsLoggedIn }) => {
    return(
        <>
            <main>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Outlet />
                <Footer />
            </main>
        </>
    );  
};

// export default UserLayout