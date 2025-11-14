import { createContext, useState, useEffect } from "react";
import { axiosPrivate } from "../src/api/axios";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const location = useLocation();
    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (
            location.pathname == "/" ||
            location.pathname == "/profile" ||
            location.pathname == "/preview"
        ) {
            (async () => {
                try {
                    if (!isAuthenticated) {
                        setIsLoading(false);
                        return;
                    }
                    if (!isDataFetched) {
                        const res = await axiosPrivate("/profile");
                        setUserData(res.data.user);
                        setIsDataFetched(true);
                    }
                } catch (error) {
                    const errorMessage = error?.response?.data?.message;
                    console.error(error);
                    if (errorMessage == "jwt malformed") {
                        Cookies.remove("jwt");
                        setIsDataFetched(false);
                        setUserData({});
                        navigate("/login");
                    }
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [location.pathname, isAuthenticated, isDataFetched, navigate]);
    return (
        <userContext.Provider
            value={{ userData, setUserData, isLoading, setIsDataFetched }}
        >
            {children}
        </userContext.Provider>
    );
};

export default userContext;
