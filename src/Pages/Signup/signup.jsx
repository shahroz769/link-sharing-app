import { useState } from "react";
import "./signup.css";
import InputField from "../../Components/Input Field";
import logoLarge from "../../assets/images/logo-devlinks-large.svg";
import emailIcon from "../../assets/images/icon-email.svg";
import passwordIcon from "../../assets/images/icon-password.svg";
import userIcon from "../../assets/images/icon-username.svg";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const userSignUp = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/signup`, {
                email,
                userName,
                password,
                repeatPassword,
            });
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            console.log("res", res);
            toast.success("Registration successful. You can now Login.", {
                duration: 2000,
                position: "bottom-center",
                style: {
                    backgroundColor: "var(--black-90-)",
                    color: "var(--white-90-)",
                    minWidth: "397px",
                },
            });
        } catch (error) {
            console.log(error);
            toast.error("Kindly check and try again.", {
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
        <div className="signup-container">
            <div className="logo">
                <img src={logoLarge} alt="Logo" />
            </div>
            <div className="signup-card">
                <div className="signup-head">
                    <h2>Create account</h2>
                    <p>Let’s get you started sharing your links!</p>
                </div>
                <div className="signup-fields">
                    <InputField
                        value={email}
                        label="Email address"
                        iconSrc={emailIcon}
                        altText="Email"
                        placeholderText="e.g. alex@email.com"
                        onInputChange={(emailVal) => setEmail(emailVal)}
                    />
                    <InputField
                        value={userName}
                        label="User name"
                        iconSrc={userIcon}
                        altText="user name"
                        placeholderText="At least 6 characters"
                        onInputChange={(userVal) => setUserName(userVal)}
                    />
                    <InputField
                        value={password}
                        label="Create password"
                        type="password"
                        iconSrc={passwordIcon}
                        altText="Password"
                        placeholderText="At least 8 characters"
                        onInputChange={(passVal) => setPassword(passVal)}
                    />
                    <InputField
                        value={repeatPassword}
                        label="Confirm password"
                        type="password"
                        iconSrc={passwordIcon}
                        altText="Confirm Password"
                        placeholderText="At least 8 characters"
                        onInputChange={(repPassVal) =>
                            setRepeatPassword(repPassVal)
                        }
                    />

                    <Button handleClick={userSignUp} buttonText="Signup" />
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="create-account"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
