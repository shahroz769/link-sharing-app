import { useContext, useEffect, useState } from "react";
import Button from "../../Components/Button";
import Buttonsecondary from "../../Components/Button Secondary/buttonsecondary";
import "./Preview.css";
import RightArrow from "../../assets/images/icon-arrow-right.svg";
import RightArrowBlack from "../../assets/images/icon-arrow-right-black.svg";
import userContext from "../../../context/userContext";
import { axiosPrivate } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import PreviewHeaderSkeleton from "../../Components/Skeleton/PreviewHeaderSkeleton/PreviewHeaderSkeleton";
import linkContext from "../../../context/linkContext";
import { Skeleton } from "antd";
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
import whatsappIcon from "../../assets/images/icon-whatsapp-white.svg";
import xdaIcon from "../../assets/images/icon-xda-white.svg";
import instagramIcon from "../../assets/images/icon-instagram-white.svg";
import discordIcon from "../../assets/images/icon-discord-white.svg";
import telegramIcon from "../../assets/images/icon-telegram-white.svg";
import threadsIcon from "../../assets/images/icon-threads-white.svg";
import websiteIcon from "../../assets/images/icon-website-white.svg";
import redditIcon from "../../assets/images/icon-reddit-white.svg";
import quoraIcon from "../../assets/images/icon-quora-white.svg";
import tiktokIcon from "../../assets/images/icon-tiktok-white.svg";
import snapchatIcon from "../../assets/images/icon-snapchat-black.svg";
import tumblrIcon from "../../assets/images/icon-tumblr-white.svg";
import fiverrIcon from "../../assets/images/icon-fiverr-white.svg";
import upworkIcon from "../../assets/images/icon-upwork-white.svg";
import mediumIcon from "../../assets/images/icon-medium-white.svg";
import { motion, useIsPresent } from "framer-motion";

const transformations =
    "f_webp,ar_1:1,c_fill,g_face,r_max,w_300,h_300/c_pad/co_rgb:633CFF,e_outline:outer:14:0/";

const Preview = () => {
    const location = useLocation();
    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);
    const { userData, isLoading } = useContext(userContext);
    const { linksData, setLinksData } = useContext(linkContext);
    const [linksLoading, setLinksLoading] = useState(true);
    const [navigatingTo, setNavigatingTo] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                if (!isAuthenticated) {
                    return;
                }
                if (linksData.length === 0) {
                    const res = await axiosPrivate("/link");
                    setLinksData(res.data.links);
                }
                setLinksLoading(false);
            } catch (error) {
                console.log(error);
                setLinksLoading(false);
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
    const isPresent = useIsPresent();
    return (
        <div className="preview-parent">
            <div className="preview-blob"></div>
            <div className="preview-header">
                <Buttonsecondary
                    onClick={() => {
                        setNavigatingTo("Home");
                        navigate("/", { state: { navigateTo: "Home" } });
                    }}
                    buttonSecondaryText="Back to Editor"
                />

                <Button handleClick={handleCopy} buttonText="Share Link" />
            </div>
            {isLoading ? (
                <div className="preview-card">
                    <PreviewHeaderSkeleton />
                    <div
                        className="preview-card-links-parent"
                        style={
                            linksData.length > 5
                                ? {
                                      maxWidth: "1000px",
                                      display: "flex",
                                      justifyContent: "safe center",
                                      flexWrap: "wrap",
                                      gap: "20px",
                                  }
                                : {
                                      display: "grid",
                                      gridTemplateRows: "repeat(5, 1fr)",
                                      gridAutoFlow: "column",
                                      gap: "20px",
                                  }
                        }
                    >
                        {linksLoading
                            ? [0, 1, 2, 3, 4].map((map, index) => (
                                  <Skeleton.Button
                                      active={isLoading}
                                      key={index}
                                      style={{
                                          width: 281,
                                          height: 56,
                                          borderRadius: 8,
                                      }}
                                  />
                              ))
                            : null}
                    </div>
                </div>
            ) : (
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
                    <div
                        className="preview-card-links-parent"
                        style={
                            linksData.length > 5
                                ? {
                                      maxWidth: "1000px",
                                      display: "flex",
                                      justifyContent: "safe center",
                                      flexWrap: "wrap",
                                      gap: "20px",
                                  }
                                : {
                                      display: "grid",
                                      gridTemplateRows: "repeat(5, 1fr)",
                                      gridAutoFlow: "column",
                                      gap: "20px",
                                  }
                        }
                    >
                        {linksLoading
                            ? [0, 1, 2, 3, 4].map((map, index) => (
                                  <Skeleton.Button
                                      active={isLoading}
                                      key={index}
                                      style={{
                                          width: 281,
                                          height: 56,
                                          borderRadius: 8,
                                      }}
                                  />
                              ))
                            : linksData.map((link, ind) => (
                                  <a
                                      key={ind}
                                      href={
                                          link.link.startsWith("http")
                                              ? link.link
                                              : `https://${link.link}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
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
                                                      linksData[ind]?.platform
                                                          ?.text;
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
                                                      FreeCodeCamp:
                                                          freeCodeCampIcon,
                                                      GitLab: gitLabIcon,
                                                      Hashnode: hashNodeIcon,
                                                      StackOverflow:
                                                          stackOverFlowIcon,
                                                      FrontendMentor:
                                                          frontendMentorIcon,
                                                      WhatsApp: whatsappIcon,
                                                      XDA: xdaIcon,
                                                      Instagram: instagramIcon,
                                                      Discord: discordIcon,
                                                      Telegram: telegramIcon,
                                                      Threads: threadsIcon,
                                                      Website: websiteIcon,
                                                      Reddit: redditIcon,
                                                      Quora: quoraIcon,
                                                      TikTok: tiktokIcon,
                                                      Snapchat: snapchatIcon,
                                                      Tumblr: tumblrIcon,
                                                      Fiverr: fiverrIcon,
                                                      Upwork: upworkIcon,
                                                      Medium: mediumIcon,
                                                  }[platformText];
                                                  return platformIcon || null;
                                              })()}
                                              alt={link.platform.text}
                                          />
                                      </div>
                                      <p
                                          style={{
                                              color: link.platform.color,
                                          }}
                                      >
                                          {link.platform.text}
                                      </p>
                                      <div>
                                          <img
                                              src={
                                                  link.platform.color ==
                                                  "#000000"
                                                      ? RightArrowBlack
                                                      : RightArrow
                                              }
                                              alt="Arrow"
                                          />
                                      </div>
                                  </a>
                              ))}
                    </div>
                </div>
            )}
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{
                    scaleX: 0,
                    transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] },
                }}
                exit={{
                    scaleX: 1,
                    transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] },
                }}
                style={{
                    originX: isPresent ? 0 : 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className="privacy-screen"
            >
                <h1 style={{ color: "white" }}>
                    {navigatingTo || location?.state?.navigateTo || "Preview"}
                </h1>
            </motion.div>
        </div>
    );
};

export default Preview;
