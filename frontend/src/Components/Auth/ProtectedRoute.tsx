import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth"
import Loading from "../Loading";

const ProtectedRoute = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />
    }

    return user ? <Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute