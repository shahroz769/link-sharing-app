import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Signup from "./Pages/Signup/signup";
import Linkstab from "./Pages/Home/Links Tab/linkstab";
import Profiletab from "./Pages/Home/Profile tab/profiletab";
import Preview from "./Pages/Preview/Preview";
import Share from "./Pages/Share/share";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/:username" element={<Share />} />
                <Route
                    path="/"
                    element={
                        <>
                            <Home>
                                <Linkstab />
                            </Home>
                        </>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <>
                            <Home>
                                <Profiletab />
                            </Home>
                        </>
                    }
                />
                <Route path="/*" element={<h1>404</h1>} />
            </Routes>
        </>
    );
};

export default App;
