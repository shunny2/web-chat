import { AxiosError } from "axios";

import { jwtInterceptor } from "../..";

export const errorInterceptor = async (error: AxiosError | any) => {
    if (error.response.status === 403) {
        let { data } = await jwtInterceptor.post("auth/refresh", {}, { withCredentials: true });

        jwtInterceptor.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;

        return jwtInterceptor(error.config);
    }

    return Promise.reject(error);
};