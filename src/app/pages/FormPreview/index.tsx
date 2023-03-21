import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getForm, submitForm, getFormForSubmission } from '../../actions/form.actions';
import { useAppDispatch, useAppSelector } from "../../store";
import { IForm } from "../../@types/form";
import FormFieldPreview from "../../shared/components/FormFieldPreview";
import Spinner from "../../shared/components/Spinner";
import { useClickAway } from "react-use";
import { FormEvent } from "react";
import useUpdatableState from "../../hooks/use-updatable-state";
import { IField } from "../../@types";

type Props = {};
type Answer = {
    field: string;
    value: number | string | (number | string)[];
};
const FormPreview = (props: Props) => {
    const dispatch = useAppDispatch();
    const { formId } = useParams();
    useEffect(() => {
        dispatch(getFormForSubmission(formId as string));
    }, [formId]);

    const { data, isLoading } = useAppSelector(state => state.form);
    const [selectedField, setSelectedField] = useState("");

    const initAnswerArray = (array: IField[]): Answer[] => {
        let answers: Answer[] = [];
        if (Array.isArray(array)) {
            array.forEach(element => {
                answers.push({ field: element._id, value: element.type === "checkboxes" ? [] : "" } as Answer);
            });
        }

        return answers;
    };

    const [answers, setAnswers] = useState<Answer[]>([]);
    const [fields] = useUpdatableState((data as IForm)?.fields, (a, b) => a === b);
    const initAnswers = useMemo(() => initAnswerArray(fields), [fields]);
    useEffect(() => {
        setAnswers(initAnswers);
    }, [initAnswers]);

    const fieldsRef = useRef(null);
    useClickAway(fieldsRef, () => {
        setSelectedField("");
    });
    if (isLoading) {
        return <Spinner />;
    }
    const handleInputChange = (index: number, value: string | number, isCheckBox: boolean) => {
        let newAnswers: Answer[] = answers;
        if (isCheckBox) {
            if ((newAnswers[index].value as (number | string)[]).indexOf(value) === -1) {
                (newAnswers[index].value as (number | string)[]).push(value);
            } else {
                let newVls = [];
                newVls = (newAnswers[index].value as (number | string)[]).filter(v => v !== value);
                (newAnswers[index].value as (number | string)[]) = [...newVls];
            }
        } else {
            newAnswers[index].value = value;
        }
        setAnswers([...newAnswers]);
    };
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(submitForm(formId as string, answers));
    };
    const clearForm = (e: FormEvent) => {
        e.preventDefault();
        setAnswers(initAnswerArray(fields));
    };
    if (isLoading && answers.length < 0) {
        return <Spinner />;
    }
    return (
        <div className="bg-secondary-shade min-h-screen">
            <div className="max-w-2xl w-full mx-auto p-8">
                <div
                    className={`border border-t-8 text-4xl font-semibold mb-4 rounded bg-secondary border-primary border-solid p-8`}
                >
                    {(data as IForm)?.titles[0].text}
                </div>
                <form ref={fieldsRef} onSubmit={e => onFormSubmit(e)} className="space-y-4">
                    {(data as IForm)?.fields &&
                        (data as IForm).fields.map((field, index) => {
                            return (
                                <FormFieldPreview
                                    onChange={(isCheckBox, e) => handleInputChange(index, e, isCheckBox)}
                                    key={field._id}
                                    field={field}
                                    value={answers[index]?.value ?? ""}
                                    onSelect={() => setSelectedField(field._id)}
                                    isSelected={field._id === selectedField}
                                />
                            );
                        })}
                    <div className="flex justify-between items-center gap-4">
                        <button type="submit" className="btn btn-primary max-w-[8rem]">
                            Submit
                        </button>
                        <button
                            onClick={e => clearForm(e)}
                            type="button"
                            className="btn btn-primary-outline max-w-[8rem]"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormPreview;
