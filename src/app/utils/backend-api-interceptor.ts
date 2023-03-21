import axios from "axios";
import i18next from "i18next";
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((req) => {
    api.defaults.headers.common["Accept-Language"] = i18next.resolvedLanguage;
    return req
});
// api.interceptors.request.use(
//     req => {
//         if (api.defaults.headers.common["Authorization"]) return req;
//         throw { message: "the token is not available" };
//     },
//     error => {
//         return Promise.reject(error);
//     },
// );
export const setAuthToken = (token: string | null): void => {
    if (token) {
        api.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token", token);
    } else {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
};
