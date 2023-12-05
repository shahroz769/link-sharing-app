import { useEffect, useRef, useState } from "react";
import "./index.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import linkContext from "../../../context/linkContext";

const linkPatterns = {
    GitHub: /^(https?:\/\/(www\.)?github\.com\/\S+)\/?$/,
    Twitter: /^(https?:\/\/(www\.)?twitter\.com\/\S+)\/?$/,
    LinkedIn: /^(https?:\/\/(www\.)?linkedin\.com\/in\/\S+)\/?$/,
    YouTube: /^(https?:\/\/(www\.)?youtube\.com\/\S+)\/?$/,
    Facebook: /^(https?:\/\/(www\.)?facebook\.com\/\S+)\/?$/,
    Twitch: /^(https?:\/\/(www\.)?twitch\.tv\/\S+)\/?$/,
    DevTo: /^(https?:\/\/(www\.)?dev\.to\/\S+)\/?$/,
    CodeWars: /^(https?:\/\/(www\.)?codewars\.com\/users\/\S+)\/?$/,
    CodePen: /^(https?:\/\/(www\.)?codepen\.io\/\S+)\/?$/,
    FreeCodeCamp: /^(https?:\/\/(www\.)?freecodecamp\.org\/\S+)\/?$/,
    GitLab: /^(https?:\/\/(www\.)?gitlab\.com\/\S+)\/?$/,
    Hashnode: /^(https?:\/\/(www\.)?hashnode\.com\/@\S+\/?)$/,
    StackOverflow: /^(https?:\/\/(www\.)?stackoverflow\.com\/users\/\S+)\/?$/,
    FrontendMentor:
        /^(https?:\/\/(www\.)?frontendmentor\.io\/profile\/\S+)\/?$/,
};

const InputField = ({
    label,
    iconSrc,
    altText,
    placeholderText,
    imgYes,
    onInputChange,
    type,
    value,
    disabled,
    index,
}) => {
    const location = useLocation();
    const [inputValue, setInputValue] = useState("");
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (value) {
            setInputValue(value);
        }
    }, [value]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onInputChange(e.target.value);
        return;
    };

    const handleInputBlur = (index, e) => {
        setIsFocused(false);
        setLinksData((prevLinksData) => {
            const updatedLinksData = [...prevLinksData];
            updatedLinksData[index] = {
                ...updatedLinksData[index],
                link: inputValue,
            };
            return updatedLinksData;
        });
        if (inputValue === "") {
            console.log("Please enter a link.");
            return;
        }
        const platform = linksData[index].platform.text;
        const pattern = linkPatterns[platform];
        if (!pattern.test(inputValue)) {
            console.log(`Invalid ${platform} link.`);
            return;
        }
        console.log(`Valid ${platform} link: ${inputValue}`);

        console.log("Context", linksData);
        return;
    };

    return (
        <div className="input-field-parent">
            <span>{label}</span>
            <div
                style={
                    isFocused
                        ? {
                              border: "1px solid var(--purple-90-)",
                              boxShadow: "0 0 32px 0 #633cff40",
                          }
                        : {}
                }
                className="input-container"
            >
                {imgYes || (
                    <div>
                        <img src={iconSrc} alt={altText} />
                    </div>
                )}
                <input
                    disabled={disabled && disabled}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={
                        location.pathname === "/"
                            ? () => handleInputBlur(index)
                            : () => setIsFocused(false)
                    }
                    type={type || "text"}
                    placeholder={placeholderText}
                />
            </div>
        </div>
    );
};

export default InputField;
