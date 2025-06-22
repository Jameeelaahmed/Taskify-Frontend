import { Outlet } from "react-router"
import Header from "../components/Header/Header"
function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default MainLayout
