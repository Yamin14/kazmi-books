import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

const AdminRoute = () => {
    const { user, loading } = useAuth();

    // Show nothing while checking auth status
    if (loading) {
        return <Loading />;
    }

    // allow access to admin pages only if user is admin
    if (user && user.role === "admin") {
        return <Outlet />;
    }

    // redirect to home page if user is not admin or not logged in
    return <Navigate to="/" replace />;

}

export default AdminRoute;