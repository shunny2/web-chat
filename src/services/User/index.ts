import { jwtInterceptor } from "../Axios";

export interface IUser {
    name?: string;
    email: string;
    password: string;
    repeatPassword?: string;
}

const create = async (userData: IUser): Promise<void | Error> => {
    try {
        const { data } = await jwtInterceptor.post("users", userData);

        if (data)
            return data.id;

        return new Error("Error registering user.");
    } catch (error: any) {
        return new Error((error.response.data as { message: string }).message || "Error registering user.");
    }
}

const forgotPassword = async (email: string): Promise<void | Error> => {
    try {
        const { data } = await jwtInterceptor.post("users/forgot-password", { email });
        
        if (data)
            return data;

        return new Error("Error send reset password email.");

    } catch (error: any) {
        return new Error((error.response.data as { message: string }).message || "Error send reset password email.");
    }
}

const resetPassword = async (token: string | undefined, password: string): Promise<void | Error> => {
    try {
        const { data } = await jwtInterceptor.patch(`users/reset-password/${token}`, { password });
        
        if (data)
            return data;

        return new Error("Error when resetting password.");

    } catch (error: any) {
        return new Error((error.response.data as { message: string }).message || "Error when resetting password.");
    }
}

export const UserService = {
    create,
    forgotPassword,
    resetPassword
};