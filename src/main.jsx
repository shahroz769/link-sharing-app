import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LinkProvider } from "../context/linkContext.jsx";
import { UserProvider } from "../context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <UserProvider>
            <LinkProvider>
                <App />
            </LinkProvider>
        </UserProvider>
    </BrowserRouter>,
);
