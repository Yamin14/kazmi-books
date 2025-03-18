import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const useAuth = () => {
    const nav = useNavigate();
    const [cookies, removeCookie] = useCookies(["token"]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //verify cookie
    useEffect(() => {
        const verifyCookie = async () => {

            if (!cookies.token) {
                nav("/login");
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.post("/auth", {}, { withCredentials: true });
                if (data.status) {
                    setUser(data.user);
                    toast.success(`Welcome back, ${data.user.username}!`, {position: "top-right"});

                } else {
                    removeCookie("token", cookies.token);
                    nav("/login");
                }

            } catch (error) {
                removeCookie("token", cookies.token);
                nav("/login");
            } finally {
                setLoading(false);
            }

        }

        verifyCookie();
    }, [cookies, nav, removeCookie]);

    //logout
    const logout = () => {
        removeCookie("token", cookies.token);
        nav("/login");
    }

    return { user, loading, logout };

}

export default useAuth;