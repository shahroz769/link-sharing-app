import { useContext, useEffect, useState } from "react";
import Button from "../../Components/Button";
import Buttonsecondary from "../../Components/Button Secondary/buttonsecondary";
import "./Preview.css";
// import GithubIcon from "../../assets/images/icon-github-white.svg";
import RightArrow from "../../assets/images/icon-arrow-right.svg";
import userContext from "../../../context/userContext";
import { axiosPrivate } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import githubIcon from "../../assets/images/icon-github-white.svg";
import twitterIcon from "../../assets/images/icon-twitter-white.svg";
import linkedInIcon from "../../assets/images/icon-linkedin-white.svg";
import youtubeIcon from "../../assets/images/icon-youtube-white.svg";
import facebookIcon from "../../assets/images/icon-facebook-white.svg";
import twitchIcon from "../../assets/images/icon-twitch-white.svg";
import devToIcon from "../../assets/images/icon-devto-white.svg";
import codeWarsIcon from "../../assets/images/icon-codewars-white.svg";
import codePenIcon from "../../assets/images/icon-codepen-white.svg";
import freeCodeCampIcon from "../../assets/images/icon-freecodecamp-white.svg";
import gitLabIcon from "../../assets/images/icon-gitlab-white.svg";
import hashNodeIcon from "../../assets/images/icon-hashnode-white.svg";
import stackOverFlowIcon from "../../assets/images/icon-stack-white-overflow.svg";
import frontendMentorIcon from "../../assets/images/icon-frontend-white-mentor.svg";

const transformations =
    "ar_1:1,c_fill,g_face,r_max,w_104,h_104/c_pad/co_rgb:633CFF,e_outline:outer:4:0/";

const Preview = () => {
    const navigate = useNavigate();
    const { userData } = useContext(userContext);
    const [links, setLinks] = useState([]);
    console.log("links---", links);
    console.log(userData);
    console.log(userData.profile);

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosPrivate("/link");
                console.log(res.data.links);
                setLinks(res.data.links);
                console.log(links);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(
            import.meta.env.VITE_FE_URL + "/" + userData.userName,
        );
        toast.success("The link has been copied to your clipboard!", {
            duration: 2000,
            position: "bottom-center",
            style: {
                backgroundColor: "var(--black-90-)",
                color: "var(--white-90-)",
                minWidth: "397px",
            },
        });
    };

    return (
        <div className="preview-parent">
            <div className="preview-blob"></div>
            <div className="preview-header">
                <Buttonsecondary
                    onClick={() => navigate("/")}
                    buttonSecondaryText="Back to Editor"
                />
                <Button handleClick={handleCopy} buttonText="Share Link" />
            </div>
            {userData?.profile && (
                <div className="preview-card">
                    <div className="preview-card-header">
                        <div className="preview-card-header-img">
                            {userData?.profile && (
                                <img
                                    src={`${userData?.profile.replace(
                                        "/upload/",
                                        `/upload/${transformations}`,
                                    )}`}
                                    alt="profile"
                                />
                            )}
                        </div>
                        <div className="preview-card-header-text">
                            {userData?.firstName && (
                                <h2>{`${userData?.firstName} ${userData?.lastName}`}</h2>
                            )}
                            {userData?.displayEmail && (
                                <p>{userData?.displayEmail}</p>
                            )}
                        </div>
                    </div>
                    <div className="preview-card-links-parent">
                        {links.map((link, ind) => (
                            <Link
                                key={ind}
                                to={link.link}
                                target="_blank"
                                className="preview-card-link"
                                style={{
                                    backgroundColor:
                                        link.platform.backgroundColor,
                                    cursor: "pointer",
                                    textDecoration: "none",
                                }}
                            >
                                <div>
                                    <img
                                        src={(() => {
                                            const platformText =
                                                links[ind]?.platform?.text;
                                            const platformIcon = {
                                                GitHub: githubIcon,
                                                Twitter: twitterIcon,
                                                LinkedIn: linkedInIcon,
                                                YouTube: youtubeIcon,
                                                Facebook: facebookIcon,
                                                Twitch: twitchIcon,
                                                DevTo: devToIcon,
                                                CodeWars: codeWarsIcon,
                                                CodePen: codePenIcon,
                                                FreeCodeCamp: freeCodeCampIcon,
                                                GitLab: gitLabIcon,
                                                Hashnode: hashNodeIcon,
                                                StackOverflow:
                                                    stackOverFlowIcon,
                                                FrontendMentor:
                                                    frontendMentorIcon,
                                            }[platformText];

                                            return platformIcon || null;
                                        })()}
                                        alt={link.platform.text}
                                    />
                                </div>
                                <p>{link.platform.text}</p>
                                <div>
                                    <img src={RightArrow} alt="Arrow" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Preview;
