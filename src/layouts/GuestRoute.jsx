import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
function GuestRoute() {
    const loggedIn = useSelector((state) => state.user);
    return !loggedIn ? <Outlet /> : <Navigate to="/" />;

}

export default GuestRoute
