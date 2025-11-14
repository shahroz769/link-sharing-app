import { useEffect, useRef, useState } from "react";
import "./index.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import linkContext from "../../../context/linkContext";

const linkPatterns = {
    GitHub: /^((https?:\/\/)?(www\.)?github\.com\/\S+)\/?$/i,
    Twitter: /^((https?:\/\/)?(www\.)?twitter\.com\/\S+)\/?$/i,
    LinkedIn: /^((https?:\/\/)?(www\.)?linkedin\.com\/in\/\S+)\/?$/i,
    YouTube: /^((https?:\/\/)?(www\.)?youtube\.com\/\S+)\/?$/i,
    Facebook: /^((https?:\/\/)?(www\.)?facebook\.com\/\S+)\/?$/i,
    Twitch: /^((https?:\/\/)?(www\.)?twitch\.tv\/\S+)\/?$/i,
    DevTo: /^((https?:\/\/)?(www\.)?dev\.to\/\S+)\/?$/i,
    CodeWars: /^((https?:\/\/)?(www\.)?codewars\.com\/users\/\S+)\/?$/i,
    CodePen: /^((https?:\/\/)?(www\.)?codepen\.io\/\S+)\/?$/i,
    FreeCodeCamp: /^((https?:\/\/)?(www\.)?freecodecamp\.org\/\S+)\/?$/i,
    GitLab: /^((https?:\/\/)?(www\.)?gitlab\.com\/\S+)\/?$/i,
    Hashnode: /^((https?:\/\/)?(www\.)?hashnode\.com\/@\S+\/?)$/i,
    StackOverflow:
        /^((https?:\/\/)?(www\.)?stackoverflow\.com\/users\/\S+)\/?$/i,
    FrontendMentor:
        /^((https?:\/\/)?(www\.)?frontendmentor\.io\/profile\/\S+)\/?$/i,
    WhatsApp: /^((https?:\/\/)?wa\.me\/\S+)\/?$/i,
    XDA: /^((https?:\/\/)?(www\.)?xdaforums\.com\/m\/\S+)\/?$/i,
    Instagram: /^((https?:\/\/)?(www\.)?instagram\.com\/\S+)\/?$/i,
    Discord: /^((https?:\/\/)?discord\.com\/users\/\S+)\/?$/i,
    Telegram: /^((https?:\/\/)?t\.me\/\S+)\/?$/i,
    Threads: /^((https?:\/\/)?threads\.com\/user\/\S+)\/?$/i,
    Website: /^((https?:\/\/)?\S+)\/?$/i,
    Reddit: /^((https?:\/\/)?(www\.)?reddit\.com\/user\/\S+)\/?$/i,
    Quora: /^((https?:\/\/)?(www\.)?quora\.com\/profile\/\S+)\/?$/i,
    TikTok: /^((https?:\/\/)?(www\.)?tiktok\.com\/@\S+)\/?$/i,
    Snapchat: /^((https?:\/\/)?(www\.)?snapchat\.com\/add\/\S+)\/?$/i,
    Tumblr: /^((https?:\/\/)?(www\.)?tumblr\.com\/\S*)$/i,
    Fiverr: /^((https?:\/\/)?(www\.)?fiverr\.com\/\S+)\/?$/i,
    Upwork: /^((https?:\/\/)?(www\.)?\.upwork\.com\/freelancers\/\S+)\/?$/i,
    Medium: /^((https?:\/\/)?medium\.com\/@\S+)\/?$/i,
};

const InputField = ({
    label,
    iconSrc,
    altText,
    placeholderText,
    imgYes,
    onInputChange,
    onKeyPress,
    type,
    value,
    disabled,
    index,
    error,
}) => {
    const location = useLocation();
    const [inputValue, setInputValue] = useState(value || "");
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [isFocused, setIsFocused] = useState(false);
    const [haveError, setHaveError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    // Sync inputValue with value prop when it changes externally
    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    useEffect(() => {
        type == "password"
            ? setErrorMessage("Please check again")
            : setErrorMessage("Can’t be empty");
        error && setHaveError(true);
    }, [error]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onInputChange && onInputChange(e.target.value);
        return;
    };

    const handleInputBlur = (index) => {
        setIsFocused(false);

        const platform = linksData[index].platform.text;
        const pattern = linkPatterns[platform];
        const isValid = pattern.test(inputValue);
        if (!isValid) {
            setHaveError(true);
            setErrorMessage("Please check the URL");
        } else {
            linksData[index] = {
                ...linksData[index],
                link: inputValue,
            };
            setLinksData([...linksData]);
            setHaveError(false);
            setErrorMessage("");
        }
    };

    return (
        <div className="input-field-parent">
            <span>{label}</span>
            <div
                style={{
                    border: isFocused
                        ? "1px solid var(--purple-90-)"
                        : "1px solid var(--black-30-)",
                    boxShadow: isFocused ? "0 0 32px 0 #633cff40" : "none",
                    ...(haveError
                        ? { border: "1px solid var(--red-90-)" }
                        : {}),
                }}
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
                            : () => {
                                  if (!inputValue) {
                                      type == "password"
                                          ? setErrorMessage(
                                                "Please check again",
                                            )
                                          : setErrorMessage("Can’t be empty");
                                      setHaveError(true);
                                  } else {
                                      setHaveError(false);
                                  }
                                  setIsFocused(false);
                              }
                    }
                    onKeyDown={onKeyPress || null}
                    type={type || "text"}
                    placeholder={placeholderText}
                />

                {haveError && (
                    <span className="input-error">{errorMessage}</span>
                )}
            </div>
            {label == "Create password" && (
                <p className="password-hint">
                    At least one lowercase letter, uppercase letter, and number
                </p>
            )}
        </div>
    );
};

export default InputField;
