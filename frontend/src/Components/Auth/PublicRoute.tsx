import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = () => {
    const { user, loading } = useAuth();

    // Show nothing while checking auth status
    if (loading) {
        return null;
    }

    // If user is logged in, redirect to books page
    if (user) {
        return <Navigate to="/books" replace />;
    }

    // If user is not logged in, allow access to login/signup pages
    return <Outlet />;
}

export default PublicRoute; 