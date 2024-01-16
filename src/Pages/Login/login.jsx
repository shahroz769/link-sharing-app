import "./login.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import InputField from "../../Components/Input Field";
import logoLarge from "../../assets/images/logo-devlinks-large.svg";
import emailIcon from "../../assets/images/icon-email.svg";
import passwordIcon from "../../assets/images/icon-password.svg";
import Button from "../../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import Cookies from "js-cookie";
import useAuth from "../../../hooks/useAuth";
import { motion, useIsPresent } from "framer-motion";
const LOGIN_URL = "/login";

const Login = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            setNavigatingTo("Home");
            navigate("/", { state: { navigateTo: "Home" } });
        }
    }, [isAuthenticated, navigate]);
    const location = useLocation();
    const [navigatingTo, setNavigatingTo] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [disable, setDisable] = useState(false);

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            userLogin();
        }
    };

    const userLogin = async () => {
        try {
            setDisable(true);
            !email ? setEmailError(true) : setEmailError(false);
            !password ? setPasswordError(true) : setEmailError(false);
            if (!email || !password) {
                toast.error("All fields are required", {
                    duration: 2000,
                    position: "bottom-center",
                    style: {
                        backgroundColor: "var(--black-90-)",
                        color: "var(--white-90-)",
                    },
                });
                return;
            }
            const res = await axiosPrivate.post(LOGIN_URL, { email, password });
            Cookies.set("jwt", res.data.token, { expires: 7 });
            setEmail("");
            setPassword("");
            setNavigatingTo("Home");
            navigate("/", { state: { navigateTo: "Home" } });
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                toast.error("No response from server", {
                    duration: 2000,
                    position: "bottom-center",
                    style: {
                        backgroundColor: "var(--black-90-)",
                        color: "var(--white-90-)",
                    },
                });
                console.error("No Server Response", err.response.data);
            } else {
                toast.error("Invalid email or password", {
                    duration: 2000,
                    position: "bottom-center",
                    style: {
                        backgroundColor: "var(--black-90-)",
                        color: "var(--white-90-)",
                    },
                });
                console.error("Login Failed", err.response.data);
            }
        } finally {
            setDisable(false);
        }
    };
    const isPresent = useIsPresent();
    return (
        <div className="login-container">
            <div className="auth-logo">
                <img src={logoLarge} alt="Logo" />
            </div>
            <div className="login-card">
                <div className="login-head">
                    <h2>Login</h2>
                    <p>Add your details below to get back into the app</p>
                </div>
                <div className="login-fields">
                    <InputField
                        value={email}
                        error={emailError}
                        onInputChange={(emailVal) => setEmail(emailVal)}
                        label="Email address"
                        iconSrc={emailIcon}
                        altText="Email"
                        placeholderText="e.g. alex@email.com"
                        onKeyPress={handleEnterKeyPress}
                    />
                    <InputField
                        value={password}
                        error={passwordError}
                        onInputChange={(passVal) => setPassword(passVal)}
                        label="Password"
                        type="password"
                        iconSrc={passwordIcon}
                        altText="Password"
                        placeholderText="Enter your password"
                        onKeyPress={handleEnterKeyPress}
                    />

                    <Button
                        disabled={disable}
                        loadingText={disable && "Logging in..."}
                        handleClick={userLogin}
                        buttonText="Login"
                    />
                    <p>
                        Don’t have an account?{" "}
                        <span
                            onClick={() => {
                                navigate("/signup", {
                                    state: { navigateTo: "Signup" },
                                });
                                setNavigatingTo("Signup");
                            }}
                            className="create-account"
                        >
                            Create account
                        </span>
                    </p>
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
                <h1 style={{ color: "white" }}>
                    {navigatingTo || location?.state?.navigateTo || "Login"}
                </h1>
            </motion.div>
        </div>
    );
};

export default Login;
