import { GET_SUBMISSIONS, SUBMISSION_ERROR, SUBMISSION_LOADING } from "../constants";
import { AnyAction } from "redux";
import { IDataState, ISubmissionAnalysis, ISubmission } from "../@types";
const initialState: IDataState<ISubmissionAnalysis | ISubmission> = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isIdle: true,
    data: undefined,
    error: null,
    status: "idle",
    message: "",
};
export default function (state = initialState, action: AnyAction): IDataState<ISubmissionAnalysis | ISubmission> {
    const { type, payload } = action;
    switch (type) {
        case SUBMISSION_LOADING:
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
        case GET_SUBMISSIONS: {
            return {
                ...state,
                data: payload,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case SUBMISSION_ERROR:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                error: { ...payload },
                status: "error",
                message: null,
                isLoading: false,
            };
        default:
            return { ...state, isIdle: true, status: "idle" };
    }
}
