import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <NavBar/>
            <div class="main-container">
                <Outlet/>            
            </div>
        </>
    );
}

export default Layout;