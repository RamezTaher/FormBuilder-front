import { IBaseState } from "./base-state";

export interface IAuthState<T> extends IBaseState<T> {
    isAuthenticated: boolean;
    token: string | null;
}
