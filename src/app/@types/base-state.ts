import { IErrorResponse } from "./error";
export interface IBaseState<T> {
    data: T | T[] | undefined;
    error: IErrorResponse | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isIdle: boolean;
    status: "idle" | "loading" | "error" | "success";
    message: string | null;
}
