import { AppThunk } from "../store";
import { api } from "../utils";
import {
    ADD_FIELD,
    ADD_FIELD_OPTION,
    DELETE_FIELD,
    FORM_ERROR,
    FORM_LOADING,
    GET_ALL_USER_FORMS,
    SUBMIT_FORM,
    UPDATE_FIELD,
    UPDATE_FORM_TITLE,
    CREATE_FORM,
    GET_FORM,
    UPDATE_FIELD_OPTIONS,
    DELETE_FIELD_OPTION,
    ADD_FORM_LANGUAGE,
    REMOVE_FORM_LANGUAGE,
    GET_FORM_TRANSLATION,
    UPDATE_FIELD_GROUP,
    UPDATE_GROUP_TYPE,
    UPDATE_FIELD_OPTIONS_VARIABLES,
    DELETE_FORM,
    GET_FORM_FOR_SUBMISSION,
} from "../constants";
import { IFieldOption } from "../@types/field-option";
import { push } from "redux-first-history";
import { TRANSLATE_FIELD_OPTIONS, GET_SUBMISSIONS } from "../constants/index";
import { IFieldQuestion } from "../@types/field-question";
import { IFieldGroup } from "../@types/field-group";
import { IFieldVariable } from "../@types/field-variable";

export const createForm = (): AppThunk => async dispatch => {
    dispatch({ type: FORM_LOADING });

    try {
        const res = await api.post("/forms");
        dispatch({ type: CREATE_FORM, payload: res.data });
        dispatch(push(`/forms/${res.data._id}/answers`));
    } catch (err) {
        dispatch({
            type: FORM_ERROR,
            payload: err,
        });
    }
};
export const getFormSubmissionAnalysis =
    (id: string): AppThunk =>
    async dispatch => {
        dispatch({ type: FORM_LOADING });

        try {
            const res = await api.get(`/forms/${id}/analysis`);
            dispatch({ type: GET_SUBMISSIONS, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const getForm =
    (id: string): AppThunk =>
    async dispatch => {
        dispatch({ type: FORM_LOADING });

        try {
            const res = await api.get(`/forms/${id}`);
            dispatch({ type: GET_FORM, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const getFormForSubmission =
    (id: string): AppThunk =>
    async dispatch => {
        dispatch({ type: FORM_LOADING });

        try {
            const res = await api.get(`/forms/${id}/s`);
            dispatch({ type: GET_FORM_FOR_SUBMISSION, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const deleteForm =
    (id: string): AppThunk =>
    async dispatch => {
        dispatch({ type: FORM_LOADING });

        try {
            await api.delete(`/forms/${id}`);
            dispatch({ type: DELETE_FORM, payload: id });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const getFormTranslation =
    (id: string, language: string): AppThunk =>
    async dispatch => {
        dispatch({ type: FORM_LOADING });

        try {
            const res = await api.get(`/forms/${id}/languages/${language}`);
            dispatch({ type: GET_FORM_TRANSLATION, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const getAllForms = (): AppThunk => async dispatch => {
    dispatch({ type: FORM_LOADING });

    try {
        const res = await api.get("/forms");
        dispatch({ type: GET_ALL_USER_FORMS, payload: res.data });
    } catch (err) {
        dispatch({
            type: FORM_ERROR,
            payload: err,
        });
    }
};

export const updateFormTitle =
    (id: string, titleId: string, title: string): AppThunk =>
    async dispatch => {
        try {
            const res = await api.patch(`/forms/${id}/titles/${titleId}`, {
                text: title,
            });
            dispatch({ type: UPDATE_FORM_TITLE, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };

export const addFieldToForm =
    (id: string, data: { order: number; type: string }): AppThunk =>
    async dispatch => {
        try {
            const res = await api.post(`/forms/${id}/fields`, data);
            dispatch({ type: ADD_FIELD, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const deleteFormField =
    (id: string, fieldId: string): AppThunk =>
    async dispatch => {
        try {
            await api.delete(`/forms/${id}/fields/${fieldId}`);
            dispatch({ type: DELETE_FIELD, payload: fieldId });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };

export const updateFormField =
    (id: string, fieldId: string, data: unknown): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${id}/fields/${fieldId}`, data);
            dispatch({ type: UPDATE_FIELD, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };

export const submitForm =
    (id: string, answers: { field: string; value: string | number | (string | number)[] }[]): AppThunk =>
    async dispatch => {
        dispatch({ type: FORM_LOADING });
        try {
            await api.post(`/forms/${id}/submissions`, { answers: answers });
            dispatch({ type: SUBMIT_FORM });
            dispatch(push(`/form/s/${id}/success`));
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const addFieldOption =
    (formId: string, fieldId: string, data: { order: number }): AppThunk =>
    async dispatch => {
        try {
            const res = await api.post(`/forms/${formId}/fields/${fieldId}/options`, data);
            dispatch({ type: ADD_FIELD_OPTION, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const deleteFieldOption =
    (formId: string, fieldId: string, data: { fieldOrder: number; fieldOptionId: string }): AppThunk =>
    async dispatch => {
        try {
            await api.delete(`/forms/${formId}/fields/${fieldId}/options/${data.fieldOptionId}`);
            dispatch({ type: DELETE_FIELD_OPTION, payload: data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const updateFieldOptions =
    (
        formId: string,
        fieldId: string,
        data: {
            options: IFieldOption[];
        },
    ): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${formId}/fields/${fieldId}/options`, data);
            dispatch({ type: UPDATE_FIELD_OPTIONS, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const translateFieldOptions =
    (
        formId: string,
        fieldId: string,
        data: {
            options: IFieldOption[];
        },
    ): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${formId}/fields/${fieldId}/options/translate`, data);
            dispatch({ type: TRANSLATE_FIELD_OPTIONS, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const translateFieldQuestion =
    (id: string, fieldId: string, data: { questions: IFieldQuestion[] }): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${id}/fields/${fieldId}/questions/translate`, data);
            dispatch({ type: UPDATE_FIELD, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
export const addNewFormLanguage =
    (formId: string, data: { language: string }): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${formId}/languages`, data);
            dispatch({ type: ADD_FORM_LANGUAGE, payload: res.data });
            dispatch(push(`/forms/${formId}/translation/${data.language}`));
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };

export const removeFormLanguage =
    (formId: string, data: { language: string }): AppThunk =>
    async dispatch => {
        try {
            await api.delete(`/forms/${formId}/languages/${data.language}`);
            dispatch({ type: REMOVE_FORM_LANGUAGE, payload: data.language });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };

export const updateFieldGroup =
    (formId: string, fieldId: string, data: { group: IFieldGroup }): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${formId}/fields/${fieldId}/groups`, data);
            dispatch({ type: UPDATE_FIELD_GROUP, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };

export const updateGroupType =
    (formId: string, fieldId: string, fieldGroupId: string, data: { groupType: IFieldGroup }): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${formId}/fields/${fieldId}/groups/${fieldGroupId}/types`, data);
            dispatch({ type: UPDATE_GROUP_TYPE, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };

export const updateFieldOptionsVariable =
    (formId: string, fieldId: string, data: { vars: IFieldVariable[] }): AppThunk =>
    async dispatch => {
        try {
            const res = await api.put(`/forms/${formId}/fields/${fieldId}/options/variables`, data);
            dispatch({ type: UPDATE_FIELD_OPTIONS_VARIABLES, payload: res.data });
        } catch (err) {
            dispatch({
                type: FORM_ERROR,
                payload: err,
            });
        }
    };
