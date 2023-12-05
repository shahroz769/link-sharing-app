import { styled } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";
import Mockup from "../../../assets/images/mockup-border.svg";
import Button from "../../../Components/Button/index.jsx";
import Buttonsecondary from "../../../Components/Button Secondary/buttonsecondary.jsx";
import emptyLinks from "../../../assets/images/illustration-empty.svg";
import Linkscustomizationempty from "../../../Components/Links Customization Empty/linkscustomizationempty.jsx";
import Linkscustomization from "../../../Components/Links Customization/linkscustomization.jsx";
// import uploadImageIcon from "../../../assets/images/icon-upload-image.svg";
import IconImageUpload from "../../../assets/images/IconImageUpload.jsx";
import InputField from "../../../Components/Input Field/index.jsx";
import "./profiletab.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { axiosPrivate } from "../../../api/axios.js";
import { useContext } from "react";
import linkContext from "../../../../context/linkContext.jsx";
import userContext from "../../../../context/userContext.jsx";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

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
    "ar_1:1,c_fill,g_face,r_12,w_193,h_193/c_pad/co_rgb:000000,e_colorize:50/";

const Profiletab = () => {
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const { userData, setUserData } = useContext(userContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        (async () => {
            console.log("Fetching user data");
            try {
                const resLinks = await axiosPrivate(getLinksEndpoint);
                resLinks?.data?.links && setLinksData(resLinks.data.links);
                const res = await axiosPrivate("/profile");
                if (res.data.status) {
                    setFirstName(res.data.user.firstName);
                    setLastName(res.data.user.lastName);
                    setEmail(res.data.user.displayEmail);
                    setUserImage(res.data.user.profile);
                }
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    const handleImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            console.log(formData);
            const res = await axios.post(
                import.meta.env.VITE_URL + "/profile/image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${Cookies.get("jwt")}`,
                    },
                },
            );
            console.log(res);
            setUserImage(res.data.url);
            setUserData({
                ...userData,
                profile: res.data.url,
            });
            toast.success("Image uploaded.", {
                duration: 2000,
                position: "bottom-center",
                style: {
                    backgroundColor: "var(--black-90-)",
                    color: "var(--white-90-)",
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const saveUserDetails = async () => {
        try {
            if (!firstName || !lastName) {
                console.error("Required filds must be provided");
                return;
            }
            const res = await axiosPrivate.post("/profile/update-user", {
                firstName,
                lastName,
                email,
            });
            setUserData({
                ...userData,
                firstName,
                lastName,
                displayEmail: email,
            });
            console.log(res);
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
        }
    };

    return (
        <>
            <div className="profile-details">
                <div className="profile-details-header">
                    <h2>Profile Details</h2>
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
                        <MuiButton
                            component="label"
                            className="upload-profile-image-main"
                        >
                            <VisuallyHiddenInput
                                onChange={(e) => handleImage(e.target.files[0])}
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

                            {/* <img
                                src={uploadImageIcon}
                                alt="Upload Profile Image"
                            /> */}
                            {userImage ? (
                                <>
                                    <IconImageUpload color="var(--white-90-)" />
                                    <h3 style={{ color: "var(--white-90-)" }}>
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
                        <div className="profile-picture-instructions">
                            <p>
                                Suggestion: Use image dimensions as 1024x1024px
                                or less. Use PNG or JPG format.
                            </p>
                        </div>
                    </div>
                    <div className="profile-details-data">
                        <div className="profile-first-name">
                            <p>First name*</p>
                            <InputField
                                value={firstName}
                                onInputChange={(val) => setFirstName(val)}
                                placeholderText="e.g. John"
                                imgYes={true}
                            />
                        </div>
                        <div className="profile-last-name">
                            <p>Last name*</p>
                            <InputField
                                value={lastName}
                                onInputChange={(val) => setLastName(val)}
                                placeholderText="e.g. Appleseed"
                                imgYes={true}
                            />
                        </div>
                        <div className="profile-email">
                            <p>Email</p>
                            <InputField
                                value={email}
                                onInputChange={(val) => setEmail(val)}
                                placeholderText="e.g. email@example.com"
                                imgYes={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-details-footer">
                <div className="profile-details-footer-btn">
                    <Button handleClick={saveUserDetails} buttonText="Save" />
                </div>
            </div>
        </>
    );
};

export default Profiletab;
