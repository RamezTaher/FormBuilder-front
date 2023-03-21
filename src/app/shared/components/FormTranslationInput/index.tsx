import React, { ChangeEvent, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "react-use";
import { IField } from "../../../@types/field";
import { translateFieldOptions, translateFieldQuestion } from "../../../actions/form.actions";
import useUpdatableState from "../../../hooks/use-updatable-state";
import { useAppDispatch } from "../../../store";
import { IFieldOptionText } from "../../../@types/field-option-text";
import { IFieldOption } from "../../../@types/field-option";
import { IFieldQuestion } from "../../../@types/field-question";

type Props = {
    isSelected: boolean;
    field: IField;
    onSelect: () => void;
    translationIndex: number;
};

const FormTranslationInput = ({ isSelected, field, onSelect, translationIndex }: Props) => {
    const dispatch = useAppDispatch();
    const { formId, transLanguage } = useParams();
    const [questions, setQuestions] = useUpdatableState(field.question, (a, b) => a === b);
    const [options, setOptions] = useUpdatableState(field.options, (a, b) => a === b);
    const isMounted = useRef(false);

    const onChangeQuestionText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let newQuestions = questions;
        if (newQuestions[index]) {
            newQuestions[index].question = e.currentTarget.value;
        } else {
            const newText = {
                question: e.currentTarget.value,
                language: transLanguage as string,
                field: field._id as unknown as IField,
            } as IFieldQuestion;
            newQuestions.push(newText);
        }
        setQuestions([...newQuestions]);
    };
    const onChangeOptionText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let newOptions = options;
        if (newOptions[index].text[translationIndex]) {
            newOptions[index].text[translationIndex].text = e.currentTarget.value;
        } else {
            const newText = {
                text: e.currentTarget.value,
                language: transLanguage as string,
                fieldOption: newOptions[index]._id as unknown as IFieldOption,
            } as IFieldOptionText;
            newOptions[index].text.push(newText);
        }
        setOptions([...newOptions]);
    };
    useDebounce(
        () => {
            if (isMounted.current) {
                dispatch(
                    translateFieldQuestion(formId as string, field._id, {
                        questions: questions,
                    }),
                );
            } else {
                isMounted.current = true;
            }
        },
        3000,
        [questions],
    );
    useDebounce(
        () => {
            if (isMounted.current) {
                dispatch(translateFieldOptions(formId as string, field._id, { options: options }));
            } else {
                isMounted.current = true;
            }
        },
        3000,
        [options],
    );
    return (
        <div
            onClick={() => onSelect()}
            className={`border rounded  ${isSelected ? "border-primary" : "border-secondary-tint"} ${
                translationIndex === 0
                    ? "border-r-0 rounded-r-none bg-dark-tint/5"
                    : " bg-secondary border-l-0 rounded-l-none"
            } border-solid p-6`}
        >
            <input
                value={questions[translationIndex] ? questions[translationIndex].question : ""}
                onChange={e => onChangeQuestionText(e, translationIndex)}
                className="w-1/2 text-xl text-dark-shade font-medium"
                type="text"
                placeholder={"Question"}
            />
            {options &&
                options.map((option, index: number) => {
                    return (
                        <div key={option._id} className="flex justify-start items-center gap-4">
                            <div
                                className={`w-5 h-5 border border-solid border-dark-tint ${
                                    field.type === "radio" && "rounded-full"
                                }`}
                            ></div>
                            <input
                                onChange={e => onChangeOptionText(e, index)}
                                type="text"
                                placeholder="option"
                                value={option.text[translationIndex] ? option.text[translationIndex].text : ""}
                                className={`border-transparent focus:border-primary w-10/12 hover:border-secondary-shade`}
                            />
                        </div>
                    );
                })}
        </div>
    );
};

export default FormTranslationInput;
