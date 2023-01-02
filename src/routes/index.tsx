import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Chat } from "../pages/Chat";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
                path="/signin"
                element={
                    <ProtectedRoute accessBy="non-authenticated">
                        <SignIn />
                    </ProtectedRoute>
                }
            ></Route>

            <Route
                path="/signup"
                element={
                    <ProtectedRoute accessBy="non-authenticated">
                        <SignUp />
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