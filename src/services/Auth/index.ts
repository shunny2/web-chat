import { IUser } from "../User";
import { jwtInterceptor } from "../Axios";

const signIn = async (userData: IUser): Promise<any | Error> => {
    try {
        const { data } = await jwtInterceptor.post<any | Error>("auth/login", userData, { withCredentials: true });

        jwtInterceptor.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;

        if (data)
            return data;
            
        return new Error("Error when logging in.");
    } catch (error: any) {
        return new Error((error.response.data as { message: string }).message || "Error when logging in.");
    }
}

const signOut = async (): Promise<void | Error> => {
    try {
        await jwtInterceptor.post("auth/logout", {}, { withCredentials: true });
    } catch (error: any) {
        return new Error((error.response.data as { message: string }).message || "Error clearing cookies.");
    }
}

export const AuthService = {
    signIn,
    signOut
};