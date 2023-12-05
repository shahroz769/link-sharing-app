import { useState, useEffect } from "react";
import "./login.css";
import InputField from "../../Components/Input Field";
import logoLarge from "../../assets/images/logo-devlinks-large.svg";
import emailIcon from "../../assets/images/icon-email.svg";
import passwordIcon from "../../assets/images/icon-password.svg";
import Button from "../../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import Cookies from "js-cookie";
import useAuth from "../../../hooks/useAuth";
const LOGIN_URL = "/login";

const Login = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = async () => {
        try {
            const res = await axiosPrivate.post(LOGIN_URL, { email, password });
            console.log("res", res);
            Cookies.set("jwt", res.data.token);
            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                console.error("No Server Response", err.response.data);
            } else if (err.response?.status === 400) {
                console.error(
                    "Missing Username or Password",
                    err.response.data,
                );
            } else if (err.response?.status === 401) {
                console.error("Unauthorized", err.response.data);
            } else {
                console.error("Login Failed", err.response.data);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="logo">
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
                        onInputChange={(emailVal) => setEmail(emailVal)}
                        label="Email address"
                        iconSrc={emailIcon}
                        altText="Email"
                        placeholderText="e.g. alex@email.com"
                    />
                    <InputField
                        value={password}
                        onInputChange={(passVal) => setPassword(passVal)}
                        label="Password"
                        type="password"
                        iconSrc={passwordIcon}
                        altText="Password"
                        placeholderText="Enter your password"
                    />

                    <Button handleClick={userLogin} buttonText="Login" />
                    <p>
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="create-account"
                        >
                            Create account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
