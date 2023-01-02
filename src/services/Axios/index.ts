import axios from "axios";

import { errorInterceptor } from "./Interceptor/Error";
import { responseInterceptor } from "./Interceptor/Response";

export const jwtInterceptor = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

jwtInterceptor.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);