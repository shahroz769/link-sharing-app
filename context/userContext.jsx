import { createContext, useState, useEffect } from "react";
import { axiosPrivate } from "../src/api/axios";
import { useLocation } from "react-router-dom";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (
            location.pathname == "/" ||
            location.pathname == "/profile" ||
            location.pathname == "/preview"
        ) {
            (async () => {
                try {
                    const res = await axiosPrivate("/profile");
                    setUserData(res.data.user);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [location.pathname]);
    return (
        <userContext.Provider value={{ userData, setUserData }}>
            {children}
        </userContext.Provider>
    );
};

export default userContext;
