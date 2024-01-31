import "../Preview/Preview.css";
import { useEffect, useState } from "react";
import RightArrow from "../../assets/images/icon-arrow-right.svg";
import RightArrowBlack from "../../assets/images/icon-arrow-right-black.svg";
import { axiosPrivate } from "../../api/axios";
import { useParams } from "react-router-dom";
import PreviewHeaderSkeleton from "../../Components/Skeleton/PreviewHeaderSkeleton/PreviewHeaderSkeleton";
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
import { motion, AnimatePresence } from "framer-motion";

const transformations =
    "f_avif,ar_1:1,c_fill,g_face,r_max,w_300,h_300/c_pad/co_rgb:633CFF,e_outline:outer:14:0/";

const Share = () => {
    const params = useParams();
    const paramToSend = params.username.toLowerCase();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState();
    const [linksData, setLinksData] = useState();
    const [is404, setIs404] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosPrivate("/share", {
                    params: {
                        userName: paramToSend,
                    },
                });
                setUserData(res.data.user);
                setLinksData(res.data.links);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                if (error.response.data.code === 404) {
                    setIsLoading(false);
                    setIs404(true);
                }
            }
        })();
    }, []);

    return (
        <div className="preview-parent">
            {is404 || <div className="preview-blob"></div>}

            {isLoading ? (
                <div className="preview-card">
                    <PreviewHeaderSkeleton />
                    <div
                        className="preview-card-links-parent"
                        style={
                            linksData && linksData.length > 5
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
                        {[0, 1, 2, 3, 4].map((map, index) => (
                            <Skeleton.Button
                                active={isLoading}
                                key={index}
                                style={{
                                    width: 281,
                                    height: 56,
                                    borderRadius: 8,
                                }}
                            />
                        ))}
                    </div>
                </div>
            ) : is404 ? (
                <div className="error-card">
                    <img
                        src={
                            "https://res.cloudinary.com/dke5jqhus/image/upload/f_avif/v1702304618/dev_links/dsxt4vnkvn2sa7kuqnrp.webp"
                        }
                        alt="404 Error"
                    />
                </div>
            ) : (
                userData?.profile && (
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
                            <AnimatePresence mode="wait">
                                {linksData.map((link, ind) => (
                                    <motion.div
                                        key={ind}
                                        initial={{ opacity: 0, y: -25 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.25,
                                            delay: ind * 0.05,
                                            ease: [0.83, 0, 0.17, 1],
                                        }}
                                    >
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
                                                    link.platform
                                                        .backgroundColor,
                                                cursor: "pointer",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <div>
                                                <img
                                                    style={{ width: "16px" }}
                                                    src={(() => {
                                                        const platformText =
                                                            link?.platform
                                                                ?.text;
                                                        const platformIcon = {
                                                            GitHub: githubIcon,
                                                            Twitter:
                                                                twitterIcon,
                                                            LinkedIn:
                                                                linkedInIcon,
                                                            YouTube:
                                                                youtubeIcon,
                                                            Facebook:
                                                                facebookIcon,
                                                            Twitch: twitchIcon,
                                                            DevTo: devToIcon,
                                                            CodeWars:
                                                                codeWarsIcon,
                                                            CodePen:
                                                                codePenIcon,
                                                            FreeCodeCamp:
                                                                freeCodeCampIcon,
                                                            GitLab: gitLabIcon,
                                                            Hashnode:
                                                                hashNodeIcon,
                                                            StackOverflow:
                                                                stackOverFlowIcon,
                                                            FrontendMentor:
                                                                frontendMentorIcon,
                                                            WhatsApp:
                                                                whatsappIcon,
                                                            XDA: xdaIcon,
                                                            Instagram:
                                                                instagramIcon,
                                                            Discord:
                                                                discordIcon,
                                                            Telegram:
                                                                telegramIcon,
                                                            Threads:
                                                                threadsIcon,
                                                            Website:
                                                                websiteIcon,
                                                            Reddit: redditIcon,
                                                            Quora: quoraIcon,
                                                            TikTok: tiktokIcon,
                                                            Snapchat:
                                                                snapchatIcon,
                                                            Tumblr: tumblrIcon,
                                                            Fiverr: fiverrIcon,
                                                            Upwork: upworkIcon,
                                                            Medium: mediumIcon,
                                                            Portfolio:
                                                                "https://res.cloudinary.com/dke5jqhus/image/upload/v1705847763/Portfolio/oklvsql2vlkze7p3ggmq.svg",
                                                        }[platformText];
                                                        return (
                                                            platformIcon || null
                                                        );
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
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Share;
