import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Chat } from "../pages/Chat";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword";

import { ProtectedRoute } from "./ProtectedRoute";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
                path="/sign-in"
                element={
                    <ProtectedRoute accessBy="non-authenticated">
                        <SignIn />
                    </ProtectedRoute>
                }
            ></Route>

            <Route
                path="/sign-up"
                element={
                    <ProtectedRoute accessBy="non-authenticated">
                        <SignUp />
                    </ProtectedRoute>
                }
            ></Route>

            <Route
                path="/forgot-password"
                element={
                    <ProtectedRoute accessBy="non-authenticated">
                        <ForgotPassword />
                    </ProtectedRoute>
                }
            ></Route>

            <Route
                path="/reset-password/:token"
                element={
                    <ProtectedRoute accessBy="non-authenticated">
                        <ResetPassword />
                    </ProtectedRoute>
                }
            ></Route>

            <Route
                path="/chat"
                element={
                    <ProtectedRoute accessBy="authenticated">
                        <Chat />
                    </ProtectedRoute>
                }
            ></Route>
        </Routes>
    )
};