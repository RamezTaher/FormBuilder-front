import {
    FORM_ERROR,
    FORM_LOADING,
    CREATE_FORM,
    GET_FORM,
    UPDATE_FORM_TITLE,
    ADD_FIELD,
    DELETE_FIELD,
    UPDATE_FIELD,
    SUBMIT_FORM,
    DELETE_FIELD_OPTION,
    REMOVE_FORM_LANGUAGE,
    GET_FORM_TRANSLATION,
    UPDATE_FIELD_OPTIONS,
    TRANSLATE_FIELD_OPTIONS,
    UPDATE_FIELD_GROUP,
    UPDATE_FIELD_OPTIONS_VARIABLES,
    DELETE_FORM,
} from "../constants";
import { AnyAction } from "redux";
import { IDataState, IForm } from "../@types";
import { GET_FORM_FOR_SUBMISSION } from "../constants/index";
import {
    GET_ALL_USER_FORMS,
    ADD_FIELD_OPTION,
    ADD_FORM_LANGUAGE,
    TRANSLATE_FIELD_QUESTION,
    UPDATE_GROUP_TYPE,
} from "../constants/index";
const initialState: IDataState<IForm> = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isIdle: true,
    data: undefined,
    error: null,
    status: "idle",
    message: "",
};
export default function (state = initialState, action: AnyAction): IDataState<IForm> {
    const { type, payload } = action;
    switch (type) {
        case FORM_LOADING:
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
        case CREATE_FORM: {
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
        case GET_FORM: {
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
        case GET_FORM_FOR_SUBMISSION: {
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
        case DELETE_FORM: {
            return {
                ...state,
                data: (state.data as IForm[]).filter(f => f._id !== payload),
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case GET_ALL_USER_FORMS: {
            return {
                ...state,
                data: payload.data,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case UPDATE_FORM_TITLE: {
            return {
                ...state,
                data: { ...state.data, ...payload },
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
            };
        }
        case ADD_FIELD: {
            return {
                ...state,
                data: payload,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
            };
        }
        case UPDATE_FIELD: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                data: { ...payload },
            };
        }
        case DELETE_FIELD: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                data: {
                    ...(state.data as IForm),
                    fields: (state.data as IForm).fields.filter(field => field._id !== payload),
                },
                error: null,
                isError: false,
                message: null,
            };
        }
        case SUBMIT_FORM: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case ADD_FIELD_OPTION: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
                data: { ...payload },
            };
        }
        case DELETE_FIELD_OPTION: {
            const form = state.data as IForm;
            form.fields[Number(payload.fieldOrder)].options = form.fields[Number(payload.fieldOrder)].options.filter(
                option => option._id !== payload.fieldOptionId,
            );
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                data: { ...form },
            };
        }
        case ADD_FORM_LANGUAGE: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: payload,
            };
        }
        case REMOVE_FORM_LANGUAGE: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                data: {
                    ...(state.data as IForm),
                    translations: (state.data as IForm).translations.filter(trans => trans !== payload),
                },
            };
        }
        case GET_FORM_TRANSLATION: {
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
        case FORM_ERROR:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                error: { ...payload },
                status: "error",
                message: null,
                isLoading: false,
            };
        case UPDATE_FIELD_OPTIONS: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case TRANSLATE_FIELD_OPTIONS: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case TRANSLATE_FIELD_QUESTION: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                isLoading: false,
            };
        }
        case UPDATE_FIELD_GROUP: {
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
        case UPDATE_GROUP_TYPE: {
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
        case UPDATE_FIELD_OPTIONS_VARIABLES: {
            return {
                ...state,
                isSuccess: true,
                status: "success",
                error: null,
                isError: false,
                message: null,
                data: { ...payload },
            };
        }
        default:
            return { ...state, isIdle: true, status: "idle" };
    }
}
