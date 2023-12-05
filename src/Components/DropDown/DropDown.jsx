import "./DropDown.css";
import { useEffect, useState, useRef, useContext } from "react";
import linkContext from "../../../context/linkContext";
import downArrow from "../../assets/images/icon-chevron-down.svg";
import githubIcon from "../../assets/images/icon-github.svg";
import twitterIcon from "../../assets/images/icon-twitter.svg";
import linkedInIcon from "../../assets/images/icon-linkedin.svg";
import youtubeIcon from "../../assets/images/icon-youtube.svg";
import facebookIcon from "../../assets/images/icon-facebook.svg";
import twitchIcon from "../../assets/images/icon-twitch.svg";
import devToIcon from "../../assets/images/icon-devto.svg";
import codeWarsIcon from "../../assets/images/icon-codewars.svg";
import codePenIcon from "../../assets/images/icon-codepen.svg";
import freeCodeCampIcon from "../../assets/images/icon-freecodecamp.svg";
import gitLabIcon from "../../assets/images/icon-gitlab.svg";
import hashNodeIcon from "../../assets/images/icon-hashnode.svg";
import stackOverFlowIcon from "../../assets/images/icon-stack-overflow.svg";
import frontendMentorIcon from "../../assets/images/icon-frontend-mentor.svg";

const linkOptions = [
    {
        text: "GitHub",
        image: githubIcon,
        placeholder: "e.g. https://www.github.com/johnappleseed",
        backgroundColor: "#1A1A1A",
        color: "#FFFFFF",
    },
    {
        text: "Twitter",
        image: twitterIcon,
        placeholder: "e.g. https://www.twitter.com/johnappleseed",
        backgroundColor: "#43B7E9",
        color: "#FFFFFF",
    },
    {
        text: "LinkedIn",
        image: linkedInIcon,
        placeholder: "e.g. https://www.linkedin.com/in/johnappleseed",
        backgroundColor: "#2D68FF",
        color: "#FFFFFF",
    },
    {
        text: "YouTube",
        image: youtubeIcon,
        placeholder: "e.g. https://www.youtube.com/user/johnappleseed",
        backgroundColor: "#EE3939",
        color: "#FFFFFF",
    },
    {
        text: "Facebook",
        image: facebookIcon,
        placeholder: "e.g. https://www.facebook.com/johnappleseed",
        backgroundColor: "#2442AC",
        color: "#FFFFFF",
    },
    {
        text: "Twitch",
        image: twitchIcon,
        placeholder: "e.g. https://www.twitch.tv/johnappleseed",
        backgroundColor: "#EE3FC8",
        color: "#FFFFFF",
    },
    {
        text: "DevTo",
        image: devToIcon,
        placeholder: "e.g. https://dev.to/johnappleseed",
        backgroundColor: "#333333",
        color: "#FFFFFF",
    },
    {
        text: "CodeWars",
        image: codeWarsIcon,
        placeholder: "e.g. https://www.codewars.com/users/johnappleseed",
        backgroundColor: "#8A1A50",
        color: "#FFFFFF",
    },
    {
        text: "CodePen",
        image: codePenIcon,
        placeholder: "e.g. https://codepen.io/johnappleseed",
        backgroundColor: "#212121",
        color: "#FFFFFF",
    },
    {
        text: "FreeCodeCamp",
        image: freeCodeCampIcon,
        placeholder: "e.g. https://www.freecodecamp.org/johnappleseed",
        backgroundColor: "#302267",
        color: "#FFFFFF",
    },
    {
        text: "GitLab",
        image: gitLabIcon,
        placeholder: "e.g. https://gitlab.com/johnappleseed",
        backgroundColor: "#EB4925",
        color: "#FFFFFF",
    },
    {
        text: "Hashnode",
        image: hashNodeIcon,
        placeholder: "e.g. https://hashnode.com/@johnappleseed",
        backgroundColor: "#0330D1",
        color: "#FFFFFF",
    },
    {
        text: "StackOverflow",
        image: stackOverFlowIcon,
        placeholder: "e.g. https://stackoverflow.com/users/johnappleseed",
        backgroundColor: "#EC7100",
        color: "#FFFFFF",
    },
    {
        text: "FrontendMentor",
        image: frontendMentorIcon,
        placeholder: "e.g. https://www.frontendmentor.io/profile/johnappleseed",
        backgroundColor: "#32C9E5",
        color: "#FFFFFF",
    },
];

const DropDown = ({ onSelectPlatform, index }) => {
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [showDropDown, setShowDropDown] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [isOptionHovered, setIsOptionHovered] = useState(null);

    useEffect(() => {
        setSelectedPlatform((prev) => linksData[index].platform);
        onSelectPlatform(linksData[index].platform);
    }, [linksData]);

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
        return;
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
            <div
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
                                src={(() => {
                                    switch (selectedPlatform.text) {
                                        case "GitHub":
                                            return githubIcon;
                                        case "Twitter":
                                            return twitterIcon;
                                        case "LinkedIn":
                                            return linkedInIcon;
                                        case "YouTube":
                                            return youtubeIcon;
                                        case "Facebook":
                                            return facebookIcon;
                                        case "Twitch":
                                            return twitchIcon;
                                        case "DevTo":
                                            return devToIcon;
                                        case "CodeWars":
                                            return codeWarsIcon;
                                        case "CodePen":
                                            return codePenIcon;
                                        case "FreeCodeCamp":
                                            return freeCodeCampIcon;
                                        case "GitLab":
                                            return gitLabIcon;
                                        case "Hashnode":
                                            return hashNodeIcon;
                                        case "StackOverflow":
                                            return stackOverFlowIcon;
                                        case "FrontendMentor":
                                            return frontendMentorIcon;
                                        default:
                                            return null;
                                    }
                                })()}
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
            </div>
            {showDropDown && (
                <div className="dropdown-options-container">
                    {linkOptions.map((option, ind) => (
                        <div
                            key={ind}
                            onClick={() => selectOption(option, index)}
                            onMouseEnter={() => handleMouseEnter(ind)}
                            onMouseLeave={handleMouseLeave}
                            className={`dropdown-option ${
                                isOptionHovered === ind ? "hovered" : ""
                            }`}
                        >
                            <div className="dropdown-option-img">
                                <img src={option.image} alt={option.text} />
                            </div>
                            <p className="dropdown-option-text">
                                {option.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
