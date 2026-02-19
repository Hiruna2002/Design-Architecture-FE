import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
    return(
        <>
            <main>
                <Outlet />
            </main>
        </>
    );  
};

export default UserLayout