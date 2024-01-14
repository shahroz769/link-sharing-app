import { createContext, useState, useEffect } from "react";

const linkContext = createContext();

export const LinkProvider = ({ children }) => {
    const [linksData, setLinksData] = useState([]);

    const updateLinksData = (order, link, platform) => {
        setLinksData((prev) => [
            { order: order, link: link || "", platform: platform || "" },
            ...prev,
        ]);
    };

    return (
        <linkContext.Provider
            value={{ linksData, updateLinksData, setLinksData }}
        >
            {children}
        </linkContext.Provider>
    );
};

export default linkContext;
