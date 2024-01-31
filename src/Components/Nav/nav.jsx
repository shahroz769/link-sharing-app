import "./nav.css";
import logoLarge from "../../assets/images/logo-devlinks-large.svg";
import logoSmall from "../../assets/images/logo-devlinks-small.svg";
import linkContext from "../../../context/linkContext";
import Tabs from "../Tabs/tabs";
import Buttonsecondary from "../Button Secondary/buttonsecondary";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { WarningTwoTone } from "@ant-design/icons";
import userContext from "../../../context/userContext";
import { axiosPrivate } from "../../api/axios";
import { useMediaQuery } from "react-responsive";

const Nav = ({ navigateTo }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const is750 = useMediaQuery({ maxWidth: 750 });
    const is625 = useMediaQuery({ maxWidth: 625 });
    const logoSrc = is750 ? logoSmall : logoLarge;
    const logoWidth = is750 ? 32 : 146;
    const navigate = useNavigate();
    const location = useLocation();
    const { linksData, setLinksData } = useContext(linkContext);
    const { userData, setUserData, setIsDataFetched } = useContext(userContext);
    const isProfileRoute = location.pathname === "/profile";
    const isHomeRoute = location.pathname === "/";
    const navigationHandler = (page) => {
        if (page == "/") {
            navigateTo("Links");
            navigate("/", { state: { navigateTo: "Links" } });
        } else if (page == "/profile") {
            navigateTo("Profile Details");
            navigate("/profile", { state: { navigateTo: "Profile Details" } });
        }
    };

    const saveAllData = () => {
        const linksPromise = axiosPrivate
            .post("/link/save", linksData)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });

        const detailsPromise = axiosPrivate
            .post("/profile/update-user", {
                firstName: userData.firstName,
                lastName: userData.lastName,
                displayEmail: userData.displayEmail,
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
        const a = Promise.all([linksPromise, detailsPromise])
            .then((results) => {
                navigateTo("Preview");
                navigate("/preview", { state: { navigateTo: "Preview" } });
            })
            .catch((errors) => {
                return Promise.reject(errors);
            });
        toast.promise(
            a,
            {
                loading: "Saving...",
                success: "Saved successfully!",
                error: (err) => "Couldn't save. Try again.",
            },
            {
                style: {
                    background: "var(--black-90-)",
                    color: "var(--white-90-)",
                },
                loading: {
                    position: "bottom-center",
                },
                success: {
                    duration: 2000,
                    position: "bottom-center",
                },
                error: {
                    duration: 2000,
                    position: "bottom-center",
                },
            }
        );
    };

    const navigateToPreview = () => {
        if (
            linksData.some((link) => link.link !== "") &&
            userData.profile &&
            userData.firstName &&
            userData.lastName
        ) {
            saveAllData();
        } else {
            const toastConfig = {
                icon: (
                    <WarningTwoTone
                        style={{ fontSize: 16 }}
                        twoToneColor="#FFD700"
                    />
                ),
                duration: 2000,
                position: "bottom-center",
                style: {
                    backgroundColor: "var(--black-90-)",
                    color: "var(--white-90-)",
                },
            };
            if (!linksData.some((link) => link.link !== "")) {
                toast.error("Add links to preview", toastConfig);
            } else {
                toast.error("Add profile details to preview", toastConfig);
            }
        }
    };

    return (
        <div className="nav-container">
            <div className={`nav-section ${isScrolled ? "box-shadow" : ""}`}>
                <div className="nav-logo">
                    <img
                        src={logoSrc}
                        alt="Logo"
                        style={{ width: logoWidth + "px" }}
                    />
                </div>
                <div className="nav-links">
                    <Tabs
                        clickHandler={navigationHandler}
                        clickProp="/"
                        img={"link"}
                        altText="Link"
                        tabText="Links"
                        active={isHomeRoute}
                        screenWidth={is625}
                    />
                    <Tabs
                        clickHandler={navigationHandler}
                        clickProp="/profile"
                        img={"profile"}
                        altText="Profile"
                        tabText="Profile Details"
                        active={isProfileRoute}
                        screenWidth={is625}
                    />
                </div>
                <div className="navbar-btn-container">
                    <Buttonsecondary
                        onClick={navigateToPreview}
                        buttonSecondaryText="Preview"
                        screenWidth={is625}
                    />
                </div>
            </div>
        </div>
    );
};

export default Nav;
