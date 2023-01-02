import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

interface IProtectedRoute {
    children: JSX.Element;
    accessBy: string;
}

export const ProtectedRoute = ({ children, accessBy }: IProtectedRoute) => {
    const { user } = useContext(AuthContext);

    if (accessBy === "non-authenticated") {
        if (!user)
            return children;
    } else if (accessBy === "authenticated") {
        if (user)
            return children;
    }

    return <Navigate to="/" />;
};