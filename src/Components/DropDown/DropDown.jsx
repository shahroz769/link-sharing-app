import "./DropDown.css";
import { useEffect, useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import linkContext from "../../../context/linkContext";
import downArrow from "../../assets/images/icon-chevron-down.svg";
import { getDropdownIcon } from "../../utils/iconLoader";

const linkOptions = [
    {
        text: "Website",
        image: "/src/assets/images/icon-website.svg",
        placeholder: "e.g. https://www.johnappleseed.com",
        backgroundColor: "#333333",
        color: "#FFFFFF",
    },
    {
        text: "CodePen",
        image: "/src/assets/images/icon-codepen.svg",
        placeholder: "e.g. https://codepen.io/johnappleseed",
        backgroundColor: "#212121",
        color: "#FFFFFF",
    },
    {
        text: "CodeWars",
        image: "/src/assets/images/icon-codewars.svg",
        placeholder: "e.g. https://www.codewars.com/users/johnappleseed",
        backgroundColor: "#8A1A50",
        color: "#FFFFFF",
    },
    {
        text: "DevTo",
        image: "/src/assets/images/icon-devto.svg",
        placeholder: "e.g. https://dev.to/johnappleseed",
        backgroundColor: "#333333",
        color: "#FFFFFF",
    },
    {
        text: "Discord",
        image: "/src/assets/images/icon-discord.svg",
        placeholder: "e.g. https://discord.com/users/johnappleseed#1234",
        backgroundColor: "#5865F2",
        color: "#FFFFFF",
    },
    {
        text: "Facebook",
        image: "/src/assets/images/icon-facebook.svg",
        placeholder: "e.g. https://www.facebook.com/johnappleseed",
        backgroundColor: "#2442AC",
        color: "#FFFFFF",
    },
    {
        text: "Fiverr",
        image: "/src/assets/images/icon-fiverr.svg",
        placeholder: "e.g. https://www.fiverr.com/johnappleseed",
        backgroundColor: "#1DBF73",
        color: "#FFFFFF",
    },
    {
        text: "FreeCodeCamp",
        image: "/src/assets/images/icon-freecodecamp.svg",
        placeholder: "e.g. https://www.freecodecamp.org/johnappleseed",
        backgroundColor: "#302267",
        color: "#FFFFFF",
    },
    {
        text: "FrontendMentor",
        image: "/src/assets/images/icon-frontend-mentor.svg",
        placeholder: "e.g. https://www.frontendmentor.io/profile/johnappleseed",
        backgroundColor: "#32C9E5",
        color: "#FFFFFF",
    },
    {
        text: "GitHub",
        image: "/src/assets/images/icon-github.svg",
        placeholder: "e.g. https://github.com/johnappleseed",
        backgroundColor: "#1A1A1A",
        color: "#FFFFFF",
    },
    {
        text: "GitLab",
        image: "/src/assets/images/icon-gitlab.svg",
        placeholder: "e.g. https://gitlab.com/johnappleseed",
        backgroundColor: "#EB4925",
        color: "#FFFFFF",
    },
    {
        text: "Hashnode",
        image: "/src/assets/images/icon-hashnode.svg",
        placeholder: "e.g. https://hashnode.com/@johnappleseed",
        backgroundColor: "#0330D1",
        color: "#FFFFFF",
    },
    {
        text: "Instagram",
        image: "/src/assets/images/icon-instagram.svg",
        placeholder: "e.g. https://www.instagram.com/johnappleseed",
        backgroundColor: "#E4405F",
        color: "#FFFFFF",
    },
    {
        text: "LinkedIn",
        image: "/src/assets/images/icon-linkedin.svg",
        placeholder: "e.g. https://www.linkedin.com/in/johnappleseed",
        backgroundColor: "#2D68FF",
        color: "#FFFFFF",
    },
    {
        text: "Medium",
        image: "/src/assets/images/icon-medium.svg",
        placeholder: "e.g. https://medium.com/@johnappleseed",
        backgroundColor: "#12100E",
        color: "#FFFFFF",
    },
    {
        text: "Quora",
        image: "/src/assets/images/icon-quora.svg?t=1702236917360",
        placeholder: "e.g. https://www.quora.com/profile/johnappleseed",
        backgroundColor: "#A82400",
        color: "#FFFFFF",
    },
    {
        text: "Reddit",
        image: "/src/assets/images/icon-reddit.svg",
        placeholder: "e.g. https://www.reddit.com/user/johnappleseed",
        backgroundColor: "#FF4500",
        color: "#FFFFFF",
    },
    {
        text: "Snapchat",
        image: "/src/assets/images/icon-snapchat.svg",
        placeholder: "e.g. https://www.snapchat.com/add/johnappleseed",
        backgroundColor: "#FFFC00",
        color: "#000000",
    },
    {
        text: "StackOverflow",
        image: "/src/assets/images/icon-stack-overflow.svg",
        placeholder: "e.g. https://stackoverflow.com/users/johnappleseed",
        backgroundColor: "#EC7100",
        color: "#FFFFFF",
    },
    {
        text: "Telegram",
        image: "/src/assets/images/icon-telegram.svg",
        placeholder: "e.g. https://t.me/johnappleseed",
        backgroundColor: "#0088CC",
        color: "#FFFFFF",
    },
    {
        text: "Threads",
        image: "/src/assets/images/icon-threads.svg",
        placeholder: "e.g. https://threads.com/user/johnappleseed",
        backgroundColor: "#1E2125",
        color: "#FFFFFF",
    },
    {
        text: "TikTok",
        image: "/src/assets/images/icon-tiktok.svg?t=1702236931666",
        placeholder: "e.g. https://www.tiktok.com/@johnappleseed",
        backgroundColor: "#000000",
        color: "#FFFFFF",
    },
    {
        text: "Tumblr",
        image: "/src/assets/images/icon-tumblr.svg",
        placeholder: "e.g. https://www.tumblr.com/johnappleseed",
        backgroundColor: "#35465C",
        color: "#FFFFFF",
    },
    {
        text: "Twitch",
        image: "/src/assets/images/icon-twitch.svg",
        placeholder: "e.g. https://www.twitch.tv/johnappleseed",
        backgroundColor: "#EE3FC8",
        color: "#FFFFFF",
    },
    {
        text: "Twitter",
        image: "/src/assets/images/icon-twitter.svg",
        placeholder: "e.g. https://twitter.com/johnappleseed",
        backgroundColor: "#43B7E9",
        color: "#FFFFFF",
    },
    {
        text: "Upwork",
        image: "/src/assets/images/icon-upwork.svg",
        placeholder: "e.g. https://www.upwork.com/freelancers/johnappleseed",
        backgroundColor: "#6FDA44",
        color: "#FFFFFF",
    },
    {
        text: "WhatsApp",
        image: "/src/assets/images/icon-whatsapp.svg",
        placeholder: "e.g. https://wa.me/1234567890",
        backgroundColor: "#25D366",
        color: "#FFFFFF",
    },
    {
        text: "XDA",
        image: "/src/assets/images/icon-xda.svg",
        placeholder: "e.g. https://xdaforums.com/m/johnappleseed",
        backgroundColor: "#0066CC",
        color: "#FFFFFF",
    },
    {
        text: "YouTube",
        image: "/src/assets/images/icon-youtube.svg",
        placeholder: "e.g. https://www.youtube.com/user/johnappleseed",
        backgroundColor: "#EE3939",
        color: "#FFFFFF",
    },
];


const DropDown = ({ onSelectPlatform, index }) => {
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [showDropDown, setShowDropDown] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(
        linksData[index]?.platform || null,
    );
    const [isOptionHovered, setIsOptionHovered] = useState(null);


    const handlePlatformChange = (index, e) => {
        console.log(index);
        return;
    };

    const handleMouseEnter = (i) => {
        setIsOptionHovered(i);
        return;
    };

    const handleMouseLeave = () => {
        setIsOptionHovered(null);
        return;
    };

    const dropdownRef = useRef(null);

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowDropDown(false);
        }
        return;
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const selectOption = (platform, indexArg) => {
        // Update linksData using setLinksData
        setLinksData((prevLinksData) => {
            const updatedLinksData = [...prevLinksData];
            updatedLinksData[indexArg] = {
                ...updatedLinksData[indexArg],
                platform: platform,
            };
            return updatedLinksData;
        });

        onSelectPlatform(platform);
        setSelectedPlatform(platform);
        setShowDropDown((prevShowDropDown) => !prevShowDropDown);
        return;
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <motion.div
                className={`dropbtn${
                    selectedPlatform ? " select-dropdown" : ""
                }`}
                style={
                    showDropDown
                        ? {
                              boxShadow: "0 0 32px 0 #633cff40",
                              border: "1px solid var(--purple-90-)",
                          }
                        : {}
                }
                onClick={toggleDropDown}
            >
                {selectedPlatform ? (
                    <>
                        <div className="dropdown-option-img">
                            <img
                                src={getDropdownIcon(selectedPlatform?.text)}
                                alt={selectedPlatform.text}
                            />
                        </div>
                        <p className="dropdown-option-text">
                            {selectedPlatform.text}
                        </p>
                    </>
                ) : (
                    <>
                        <p>Select an option</p>
                        <div>
                            <img src={downArrow} alt="Down" />
                        </div>
                    </>
                )}
            </motion.div>
            <AnimatePresence>
                {showDropDown && (
                    <motion.div
                        className="dropdown-options-container"
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                    >
                        {linkOptions.map((option, ind) => (
                            <motion.div
                                key={ind}
                                onClick={() => selectOption(option, index)}
                                onMouseEnter={() => handleMouseEnter(ind)}
                                onMouseLeave={handleMouseLeave}
                                className={`dropdown-option ${
                                    isOptionHovered === ind ? "hovered" : ""
                                }`}
                            >
                                <div className="dropdown-option-img">
                                    <img
                                        src={getDropdownIcon(option?.text)}
                                        alt={option.text}
                                    />
                                </div>
                                <p className="dropdown-option-text">
                                    {option.text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropDown;
