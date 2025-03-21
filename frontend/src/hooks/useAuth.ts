import { useNavigate } from "react-router";
import useCookie from "react-use-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { User } from "../types/User";

const useAuth = () => {
    const nav = useNavigate();
    const [userToken, setUserToken, removeUserToken] = useCookie("token", '0');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    //verify cookie
    useEffect(() => {
        const verifyCookie = async () => {

            // if no token cookie found
            if (!userToken) {
                console.log("No token cookie found in useCookies hook");
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                // attempt to verify token
                console.log("Attempting to verify token...");
                const { data } = await api.post("/auth", {}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log("Auth response:", data);

                // if token is valid
                if (data.success) {
                    setUser(data.user);
                    toast.success(`Welcome back, ${data.user.username}!`, { position: "top-right" });

                } else {
                    console.log("Auth verification failed");
                    removeUserToken();
                    setUser(null);
                }

            } catch (error) {
                console.error("Auth verification error:", error);
                removeUserToken();
                setUser(null);
            } finally {
                setLoading(false);
            }

        }

        verifyCookie();
    }, [userToken, nav]);

    //logout
    const logout = async () => {
        try {
            // Call backend to invalidate token
            await api.post("/auth/logout", {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Remove frontend cookie and state regardless of backend success
            removeUserToken();
            setUser(null);
            nav("/auth/login");
        }
    }

    return { user, loading, logout };

}

export default useAuth;