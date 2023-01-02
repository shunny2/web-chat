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

        return new Error("Error registering user.")
    } catch (error: any) {
        return new Error((error.response.data as { message: string }).message || "Error registering user.");
    }
}

export const UserService = {
    create
};