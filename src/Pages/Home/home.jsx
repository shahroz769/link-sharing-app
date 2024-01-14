import "./home.css";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Components/Nav/nav.jsx";
import linkContext from "../../../context/linkContext.jsx";
import MouseScroll from "../../assets/images/icon-mouse-scroll.svg";
import rightArrowIcon from "../../assets/images/icon-arrow-right.svg";
import rightArrowIconBlack from "../../assets/images/icon-arrow-right-black.svg";
import userContext from "../../../context/userContext.jsx";
import { Skeleton } from "antd";
import MockupHeadSkeleton from "../../Components/MockupHeadSkeleton/MockupHeadSkeleton.jsx";
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
const transformations =
    "f_webp,ar_1:1,c_fill,g_face,r_max,w_300,h_300/c_pad/co_rgb:633CFF,e_outline:outer:14:0/";

const Home = ({ children }) => {
    const { userData, setUserData, isLoading } = useContext(userContext);
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className="home-wrapper">
            <Nav />
            <div className="home-main">
                {windowWidth > 850 && (
                    <div className="mockup-container">
                        <div className="mockup">
                            <div className="mockup-divs-container">
                                {isLoading ? (
                                    <MockupHeadSkeleton />
                                ) : (
                                    <div className="mockup-head">
                                        <div className="mockup-head-img">
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
                                        <div className="mockup-head-title">
                                            <div
                                                className={`mockup-head-name ${
                                                    userData?.firstName
                                                        ? ""
                                                        : "mockup-head-name-empty"
                                                }`}
                                            >
                                                {userData?.firstName && (
                                                    <h3>{`${userData?.firstName} ${userData?.lastName}`}</h3>
                                                )}
                                            </div>
                                            <div
                                                className={`mockup-head-email ${
                                                    userData?.displayEmail
                                                        ? ""
                                                        : "mockup-head-email-empty"
                                                }`}
                                            >
                                                {userData?.displayEmail && (
                                                    <p>
                                                        {userData?.displayEmail}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div className="mockup-links-parent">
                                        {linksData?.length > 0 &&
                                        linksData.some(
                                            (link) => link.link !== "",
                                        )
                                            ? linksData.map(
                                                  (link, ind) =>
                                                      link.link && (
                                                          <a
                                                              key={ind}
                                                              className="mockup-link-redirect"
                                                              href={
                                                                  link.link.startsWith(
                                                                      "http",
                                                                  )
                                                                      ? link.link
                                                                      : `https://${link.link}`
                                                              }
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                          >
                                                              <div
                                                                  key={ind}
                                                                  className="mockup-link"
                                                                  style={{
                                                                      backgroundColor:
                                                                          link
                                                                              .platform
                                                                              .backgroundColor,
                                                                      cursor: "pointer",
                                                                  }}
                                                              >
                                                                  <div>
                                                                      <img
                                                                          src={(() => {
                                                                              const platformText =
                                                                                  link
                                                                                      ?.platform
                                                                                      ?.text;
                                                                              const platformIcon =
                                                                                  {
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
                                                                                  }[
                                                                                      platformText
                                                                                  ];
                                                                              return (
                                                                                  platformIcon ||
                                                                                  null
                                                                              );
                                                                          })()}
                                                                          alt={
                                                                              link
                                                                                  .platform
                                                                                  .text
                                                                          }
                                                                      />
                                                                  </div>
                                                                  <p
                                                                      style={{
                                                                          color: link
                                                                              .platform
                                                                              .color,
                                                                          flex: 1,
                                                                      }}
                                                                  >
                                                                      {
                                                                          link
                                                                              .platform
                                                                              .text
                                                                      }
                                                                  </p>
                                                                  <div>
                                                                      <img
                                                                          src={
                                                                              link
                                                                                  .platform
                                                                                  .text ==
                                                                              "#000000"
                                                                                  ? rightArrowIconBlack
                                                                                  : rightArrowIcon
                                                                          }
                                                                          alt="right arrow"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </a>
                                                      ),
                                              )
                                            : [0, 1, 2, 3, 4].map(
                                                  (map, index) => (
                                                      <Skeleton.Button
                                                          active={isLoading}
                                                          key={index}
                                                          style={{
                                                              width: 237,
                                                              height: 47,
                                                              borderRadius: 8,
                                                          }}
                                                      />
                                                  ),
                                              )}
                                    </div>
                                    {linksData.length > 5 &&
                                        linksData.every(
                                            (link) => link.link !== "",
                                        ) && (
                                            <div className="scroll-indicator">
                                                <img
                                                    src={MouseScroll}
                                                    alt="Scroll Indicator"
                                                />
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="links-customization-parent">{children}</div>
            </div>
        </div>
    );
};

export default Home;
