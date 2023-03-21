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
import { AppThunk } from "../store";
import { setAuthToken, api } from "../utils";
export const loadUser = (): AppThunk => async dispatch => {
    dispatch({
        type: AUTH_LOADING,
    });
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await api.get("/auth/authcheck");
        dispatch({
            type: LOAD_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err,
        });
    }
};

export const login =
    (data: { email: string; password: string }): AppThunk =>
    async dispatch => {
        dispatch({
            type: AUTH_LOADING,
        });
        try {
            const res = await api.post("/auth/login", data);
            setAuthToken(res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err,
            });
        }
    };
export const forgotPassword =
    (data: { email: string }): AppThunk =>
    async dispatch => {
        dispatch({
            type: AUTH_LOADING,
        });
        try {
            const res = await api.post("/auth/forgot_password", data);
            dispatch({
                type: FORGOT_PASSWORD,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err,
            });
        }
    };
export const resetPassword =
    (data: { email: string; resetToken: string }): AppThunk =>
    async dispatch => {
        dispatch({
            type: AUTH_LOADING,
        });
        try {
            const res = await api.post("/auth/reset_password", data);
            dispatch({
                type: RESET_PASSWORD,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err,
            });
        }
    };
export const logout = (): AppThunk => async dispatch => {
    dispatch({
        type: LOGOUT,
    });
};
