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
import { getPreviewIcon } from "../../utils/iconLoader";
import { motion, useIsPresent } from "framer-motion";

const transformations =
    "f_avif,ar_1:1,c_fill,g_face,r_max,w_300,h_300/c_pad/co_rgb:633CFF,e_outline:outer:14:0/";

const Preview = () => {
    const location = useLocation();
    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    const { userData, isLoading } = useContext(userContext);
    const { linksData, isLinkLoading } = useContext(linkContext);
    const [navigatingTo, setNavigatingTo] = useState(null);

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
                        {isLinkLoading
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
                        {isLinkLoading
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
                                              src={getPreviewIcon(link?.platform?.text)}
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
