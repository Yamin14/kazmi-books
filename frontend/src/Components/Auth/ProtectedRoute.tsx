import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import Loading from "../Loading";

const ProtectedRoute = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute