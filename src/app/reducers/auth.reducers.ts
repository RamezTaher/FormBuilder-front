import {
    AUTH_LOADING,
    FORGOT_PASSWORD,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    RESET_PASSWORD,
    LOAD_USER,
    LOGOUT,
} from "../constants";
import { AnyAction } from "redux";
import { IAuthState, IUser } from "../@types";

const initialState: IAuthState<IUser> = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isIdle: true,
    data: undefined,
    error: null,
    status: "idle",
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    message: null,
};
export default function (state = initialState, action: AnyAction): IAuthState<IUser> {
    const { type, payload } = action;
    switch (type) {
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                data: payload.user,
                error: null,
                isError: false,
                isSuccess: true,
                status: "success",
                message: null,
            };

        case AUTH_LOADING:
            return {
                ...state,
                status: "loading",
                isLoading: true,
                isError: false,
                isSuccess: false,
                isIdle: false,
                error: null,
                message: null,
            };
        case LOGIN_SUCCESS: {
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuthenticated: true,
                data: payload.data,
                token: payload.token,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case FORGOT_PASSWORD:
            return {
                ...state,
                message: payload.message,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                isLoading: false,
            };
        case RESET_PASSWORD:
            return {
                ...state,
                message: payload.message,
                status: "success",
                isSuccess: true,
                error: null,
                isError: false,
                isLoading: false,
            };
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                isSuccess: false,
                isError: true,
                error: { ...payload },
                status: "error",
                isAuthenticated: false,
                message: null,
                isLoading: false,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                data: undefined,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        default:
            return { ...state, isIdle: true, status: "idle" };
    }
}
