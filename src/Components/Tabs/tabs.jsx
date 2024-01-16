import "./tabs.css";
import IconLink from "../../assets/images/iconLink";
import IconProfile from "../../assets/images/iconProfile";
import { useState } from "react";
const Tabs = ({
    img,
    tabText,
    clickHandler,
    clickProp,
    active,
    screenWidth,
}) => {
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            onClick={() => clickHandler(clickProp || null) || null}
            className={`tab-container${active ? " active" : ""}`}
        >
            <div className="tab-img">
                {img == "link" ? (
                    <IconLink
                        color={
                            (isBtnHovered && "var(--purple-90-)") ||
                            (active && "var(--purple-90-)")
                        }
                    />
                ) : (
                    <IconProfile
                        color={
                            (isBtnHovered && "var(--purple-90-)") ||
                            (active && "var(--purple-90-)")
                        }
                    />
                )}
            </div>
            {screenWidth || (
                <div className="tab-text">
                    <h3>{tabText}</h3>
                </div>
            )}
        </div>
    );
};

export default Tabs;
