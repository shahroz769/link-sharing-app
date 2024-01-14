import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Signup from "./Pages/Signup/signup";
import Linkstab from "./Pages/Home/Links Tab/linkstab";
import Profiletab from "./Pages/Home/Profile tab/profiletab";
import Preview from "./Pages/Preview/Preview";
import RequireAuth from "../hooks/RequireAuth";
import Auth from "../hooks/Auth";
import Share from "./Pages/Share/share";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Auth>
                            <Login />
                        </Auth>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Auth>
                            <Signup />
                        </Auth>
                    }
                />

                <Route
                    path="/preview"
                    element={
                        <RequireAuth>
                            <Preview />
                        </RequireAuth>
                    }
                />

                <Route path="/:username" element={<Share />} />

                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home>
                                <Linkstab />
                            </Home>
                        </RequireAuth>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <RequireAuth>
                            <Home>
                                <Profiletab />
                            </Home>
                        </RequireAuth>
                    }
                />

                <Route path="/*" element={<h1>404</h1>} />
            </Routes>
        </>
    );
};

export default App;
