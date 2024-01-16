import { styled } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";
import Button from "../../../Components/Button/index.jsx";
import IconImageUpload from "../../../assets/images/IconImageUpload.jsx";
import InputField from "../../../Components/Input Field/index.jsx";
import IconLogout from "../../../assets/images/IconLogout";
import { IconButton } from "@mui/material";
import "./profiletab.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosPrivate } from "../../../api/axios.js";
import { useContext } from "react";
import linkContext from "../../../../context/linkContext.jsx";
import userContext from "../../../../context/userContext.jsx";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth.jsx";
import PreviewFieldsSkeleton from "../../../Components/PreviewFieldsSkeleton/PreviewFieldsSkeleton.jsx";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const getLinksEndpoint = "/link";

const transformations =
    "f_webp,ar_1:1,c_fill,g_face,r_12,w_300,h_300/c_pad/co_rgb:000000,e_colorize:50/";

const Profiletab = () => {
    const navigate = useNavigate();
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const { userData, setUserData, isLoading } = useContext(userContext);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const [userImage, setUserImage] = useState(null);
    const [disable, setDisable] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const isAuthenticated = useAuth();
    const { setIsDataFetched } = useContext(userContext);

    useEffect(() => {
        setUserImage(userData?.profile);
    }, [userData]);

    // useEffect(() => {
    //     (async () => {
    //         if (!isAuthenticated) {
    //             navigate("/login");
    //             return;
    //         }
    //         try {
    //             if (!linksData[0]?.link) {
    //                 const resLinks = await axiosPrivate(getLinksEndpoint);
    //                 resLinks?.data?.links && setLinksData(resLinks.data.links);
    //             }
    //             return;
    //         } catch (error) {
    //             console.error(error.message);
    //             return;
    //         }
    //     })();
    // }, []);

    const handleImage = (file) => {
        if (isImageUploading) {
            return;
        }
        setIsImageUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        const promise = axios
            .post(import.meta.env.VITE_URL + "/profile/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${Cookies.get("jwt")}`,
                },
            })
            .then((res) => {
                setUserImage(res.data.url);
                setUserData({
                    ...userData,
                    profile: res.data.url,
                });
            })
            .catch((error) => {
                console.error(error);
                if (
                    error.response &&
                    error.response.data.message.includes("File size too large.")
                ) {
                    error.message = "File size exceeds 10MB.";
                } else if (error?.response?.data) {
                    error.message = "Failed to upload image. try again";
                } else {
                    error.message = "No response from the server.";
                }
                return Promise.reject(error);
            })
            .finally(() => setIsImageUploading(false));
        toast.promise(
            promise,
            {
                loading: "Uploading image...",
                success: "Image uploaded successfully!",
                error: (err) => err.message,
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
            },
        );
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            saveUserDetails();
        }
    };

    const saveUserDetails = async () => {
        try {
            setDisable(true);
            if (!userData.firstName || !userData.lastName) {
                return;
            }
            const res = await axiosPrivate.post("/profile/update-user", {
                firstName: userData.firstName,
                lastName: userData.lastName,
                displayEmail: userData.displayEmail,
            });
            toast.success("Saved successfully!", {
                duration: 2000,
                position: "bottom-center",
                style: {
                    backgroundColor: "var(--black-90-)",
                    color: "var(--white-90-)",
                },
            });
        } catch (error) {
            console.error(error.message);
            toast.success("Couldn't save. Try again.", {
                duration: 2000,
                position: "bottom-center",
                style: {
                    backgroundColor: "var(--black-90-)",
                    color: "var(--white-90-)",
                },
            });
        } finally {
            setDisable(false);
        }
    };
    const isPresent = useIsPresent();
    return (
        <>
            <div className="profile-details">
                <div className="profile-details-header">
                    <div className="profile-details-heading">
                        <h2>Profile Details</h2>
                        <IconButton
                            className="logout-btn"
                            onMouseEnter={() => setIsLogoutHovered(true)}
                            onMouseLeave={() => setIsLogoutHovered(false)}
                            onClick={() => {
                                setIsDataFetched(false);
                                setUserData({});
                                setLinksData([]);
                                Cookies.remove("jwt");
                                navigate("/");
                            }}
                        >
                            <IconLogout
                                fill={isLogoutHovered && "var(--red-90-)"}
                            />
                        </IconButton>
                    </div>
                    <p>
                        Add your details to create a personal touch to your
                        profile.
                    </p>
                </div>
                <div className="profile-details-main">
                    <div className="profile-details-picture">
                        <div className="profile-picture-text">
                            <p>Profile picture</p>
                        </div>
                        {isLoading ? (
                            <Skeleton.Button
                                active
                                style={{
                                    width: 190,
                                    height: 190,
                                    borderRadius: 12,
                                }}
                            />
                        ) : (
                            <MuiButton
                                sx={{ borderRadius: "12px" }}
                                component="label"
                                className="upload-profile-image-main"
                            >
                                <VisuallyHiddenInput
                                    onChange={(e) =>
                                        handleImage(e.target.files[0])
                                    }
                                    type="file"
                                    accept="image/png, image/jpeg"
                                />
                                <div className="upload-image">
                                    {userImage && (
                                        <img
                                            src={`${userImage.replace(
                                                "/upload/",
                                                `/upload/${transformations}`,
                                            )}`}
                                            alt="user"
                                        />
                                    )}
                                </div>
                                {userImage ? (
                                    <>
                                        <IconImageUpload color="var(--white-90-)" />
                                        <h3
                                            style={{
                                                color: "var(--white-90-)",
                                            }}
                                        >
                                            Change Image
                                        </h3>
                                    </>
                                ) : (
                                    <>
                                        <IconImageUpload />
                                        <h3>+ Upload Image</h3>
                                    </>
                                )}
                            </MuiButton>
                        )}
                        <div className="profile-picture-instructions">
                            <p>
                                Suggestion: Image size should be less than 10MB.
                                Use PNG or JPG format.
                            </p>
                        </div>
                    </div>
                    {isLoading ? (
                        <PreviewFieldsSkeleton />
                    ) : (
                        <div className="profile-details-data">
                            <div className="profile-first-name">
                                <p>First name*</p>
                                <InputField
                                    value={userData?.firstName || ""}
                                    onInputChange={(val) =>
                                        setUserData({
                                            ...userData,
                                            firstName: val,
                                        })
                                    }
                                    placeholderText="e.g. John"
                                    imgYes={true}
                                    onKeyPress={handleEnterKeyPress}
                                />
                            </div>
                            <div className="profile-last-name">
                                <p>Last name*</p>
                                <InputField
                                    value={userData?.lastName || ""}
                                    onInputChange={(val) =>
                                        setUserData({
                                            ...userData,
                                            lastName: val,
                                        })
                                    }
                                    placeholderText="e.g. Appleseed"
                                    imgYes={true}
                                    onKeyPress={handleEnterKeyPress}
                                />
                            </div>
                            <div className="profile-email">
                                <p>Email</p>
                                <InputField
                                    value={userData?.displayEmail || ""}
                                    onInputChange={(val) =>
                                        setUserData({
                                            ...userData,
                                            displayEmail: val,
                                        })
                                    }
                                    placeholderText="e.g. email@example.com"
                                    imgYes={true}
                                    onKeyPress={handleEnterKeyPress}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="profile-details-footer">
                <div className="profile-details-footer-btn">
                    <Button
                        disabled={disable}
                        loadingText={disable && "Saving..."}
                        handleClick={saveUserDetails}
                        buttonText="Save"
                    />
                </div>
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
                <h1 style={{ color: "white" }}>"Profile Details"</h1>
            </motion.div>
        </>
    );
};

export default Profiletab;
