import "./home.css";
import { useContext, useState, useEffect } from "react";
import Nav from "../../Components/Nav/nav.jsx";
import linkContext from "../../../context/linkContext.jsx";
import MouseScroll from "../../assets/images/icon-mouse-scroll.svg";
import rightArrowIcon from "../../assets/images/icon-arrow-right.svg";
import rightArrowIconBlack from "../../assets/images/icon-arrow-right-black.svg";
import userContext from "../../../context/userContext.jsx";
import { Skeleton } from "antd";
import { useLocation } from "react-router-dom";
import MockupHeadSkeleton from "../../Components/MockupHeadSkeleton/MockupHeadSkeleton.jsx";
import { getPreviewIcon } from "../../utils/iconLoader";
import { motion, useIsPresent } from "framer-motion";
const transformations =
    "f_avif,ar_1:1,c_fill,g_face,r_max,w_300,h_300/c_pad/co_rgb:633CFF,e_outline:outer:14:0/";

const Home = ({ children }) => {
    const location = useLocation();
    const { userData, setUserData, isLoading } = useContext(userContext);
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [navigatingTo, setNavigatingTo] = useState(null);
    const handleNavigatingTo = (pageName) => {
        setNavigatingTo(pageName);
    };
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const isPresent = useIsPresent();
    return (
        <div className="home-wrapper">
            <Nav navigateTo={handleNavigatingTo} />
            <div className="home-main">
                {windowWidth > 850 && (
                    <div className="mockup-container">
                        <div className="mockup">
                            <img
                                fetchPriority="high"
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                }}
                                src="https://res.cloudinary.com/dke5jqhus/image/upload/f_avif,w_308,h_632/v1702298868/dev_links/mockup-border_vmrdd7.png"
                                alt="mobile mockup"
                            />
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
                                                                          src={getPreviewIcon(link?.platform?.text)}
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
                    {navigatingTo || location?.state?.navigateTo || "Home"}
                </h1>
            </motion.div>
        </div>
    );
};

export default Home;
