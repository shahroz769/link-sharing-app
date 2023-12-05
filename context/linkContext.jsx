import { createContext, useState } from "react";

const linkContext = createContext();

export const LinkProvider = ({ children }) => {
    const [linksData, setLinksData] = useState([]);

    const updateLinksData = (order, link, platform) => {
        setLinksData((prev) => [
            ...linksData,
            { order: order, link: link || "", platform: platform || "" },
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
