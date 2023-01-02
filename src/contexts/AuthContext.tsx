import { createContext, ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import { AuthService } from "../services/Auth";
import { IUser, UserService } from "../services/User";
import { getCookie, removeCookie, setCookie } from "../utils/Cookie";

interface IAuthContext {
    user: IUser | any,
    signUp: (userData: IUser) => Promise<void | Error>;
    login: (userData: IUser) => Promise<void | Error>;
    logout: () => Promise<void>;
}

interface IAuthContextProvider {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
    const [user, setUser] = useState(() => {
        if (getCookie("token")) {
            let token = getCookie("token") || "{}";
            return jwt_decode(token);
        }

        return null;
    });

    const navigate = useNavigate();

    const signUp = useCallback(async (userData: IUser) => {
        await UserService.create(userData);
    }, []);

    const login = useCallback(async (userData: IUser) => {
        const result = await AuthService.signIn(userData);

        setCookie("token", result.token);
        setUser(jwt_decode(result.token));

        navigate("/");
    }, [navigate]);

    const logout = useCallback(async () => {
        await AuthService.signOut();

        removeCookie("token");
        setUser(null);
 
        navigate("/");
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};