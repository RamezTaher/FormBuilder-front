import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IForm } from "../../../../@types";
import { getFormTranslation } from "../../../../actions/form.actions";
import Spinner from "../../../../shared/components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../../store";
import FormTranslationInput from "../../../../shared/components/FormTranslationInput/index";

type Props = {};

const FormTranslationEdit = (props: Props) => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.form);
    const { formId, transLanguage } = useParams();
    const [selectedField, setSelectedField] = useState("");
    const setLanguageText = (language: string) => {
        switch (language) {
            case "ar":
                return "arabic";
            case "fr":
                return "french";
            case "en":
                return "english";
            default:
                return "";
        }
    };
    useEffect(() => {
        dispatch(getFormTranslation(formId as string, transLanguage as string));
    }, [formId, transLanguage]);
    
    
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className="py-6 min-h-screen h-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-dark font-bold text-2xl flex justify-start items-center gap-2 ">
                    <div className="text-dark-tint">Translation </div>
                    <span className="text-dark-tint"> - </span>{" "}
                    <Link to="../translation" className="text-dark-tint">
                        {(data as IForm)?.titles[0]?.text}
                    </Link>
                    <span className="text-dark-tint"> - </span>{" "}
                    <div className="text-dark-shade capitalize">{setLanguageText(transLanguage as string)}</div>
                </h1>
            </div>
            <div className="space-y-4">
                <div className="flex justify-start items-center w-full gap-4">
                    <div className="w-1/2 text-2xl text-dark-shade font-bold capitalize">Original Text</div>
                    <div className="w-1/2 text-2xl text-dark-shade font-bold capitalize">{setLanguageText(transLanguage as string)}</div>
                </div>
                {(data as IForm)?.fields.length > 0 &&
                    (data as IForm).fields.map((field, index) => {
                        return (
                            <div key={field._id} className="flex justify-between items-center">
                                <div className="w-1/2 ">
                                    <FormTranslationInput
                                        field={field}
                                        onSelect={() => setSelectedField(field._id)}
                                        isSelected={field._id === selectedField}
                                        translationIndex={0}
                                    />
                                </div>
                                <div className="w-1/2 space-y-4">
                                    <FormTranslationInput
                                        field={field}
                                        onSelect={() => setSelectedField(field._id)}
                                        isSelected={field._id === selectedField}
                                        translationIndex={1}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default FormTranslationEdit;
