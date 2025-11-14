import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../src/api/axios";

const linkContext = createContext();

export const LinkProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useAuth();
    const [linksData, setLinksData] = useState([]);
    const [isLinkFetched, setIsLinkFetched] = useState(false);
    const [isLinkLoading, setIsLinkLoading] = useState(true);

    const updateLinksData = (order, link, platform) => {
        setLinksData((prev) => [
            { order: order, link: link || "", platform: platform || "" },
            ...prev,
        ]);
    };

    useEffect(() => {
        const getLinksData = async () => {
            try {
                if (!isAuthenticated) {
                    setIsLinkLoading(false);
                    return;
                }
                const res = await axiosPrivate("/link");
                if (res?.data?.links) {
                    setLinksData(res.data.links);
                    setIsLinkFetched(true);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLinkLoading(false);
            }
        };
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
            if (!isLinkFetched && isAuthenticated) {
                getLinksData();
            }
        }
    }, [location.pathname, isLinkFetched, isAuthenticated]);

    return (
        <linkContext.Provider
            value={{
                linksData,
                updateLinksData,
                setLinksData,
                setIsLinkFetched,
                isLinkFetched,
                setIsLinkLoading,
                isLinkLoading,
            }}
        >
            {children}
        </linkContext.Provider>
    );
};

export default linkContext;
