import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../shared/components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IForm } from "../../../@types/form";
import { addNewFormLanguage, getForm, removeFormLanguage } from "../../../actions/form.actions";
import { format, parseISO } from "date-fns";
import { Combobox, Dialog } from "@headlessui/react";

type Props = {};
const languages = [
    { id: "ar", name: "arabic" },
    { id: "fr", name: "french" },
    { id: "en", name: "english" },
];
const FormTranslation = (props: Props) => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.form);
    const { formId } = useParams();
    let [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [query, setQuery] = useState("");
    const filteredLanguages =
        query === ""
            ? languages
            : languages.filter(language =>
                  language.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")),
              );

    const addFormLanguage = (language: { id: string; name: string }) => {
        setSelectedLanguage(language);
        dispatch(addNewFormLanguage(formId as string, { language: language.id }));
    };
    useEffect(() => {
        dispatch(getForm(formId as string));
    }, [formId]);
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
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <div className="py-6 min-h-full h-screen">
                <h1 className="text-dark font-bold text-2xl flex justify-start items-center gap-2 mb-8">
                    <div className="text-dark-tint">Translation </div>
                    <span className="text-dark-tint"> - </span>{" "}
                    <div className="text-dark-shade">{(data as IForm)?.titles && (data as IForm).titles[0]?.text}</div>
                </h1>
                <div className="border border-solid border-secondary-tint rounded-md overflow-hidden bg-secondary p-2">
                    <table className="min-w-full divide-y divide-gray-300 ">
                        <thead className="text-dark-tint">
                            <tr>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    Language
                                </th>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    Last Update
                                </th>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    Translation
                                </th>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Array.isArray((data as IForm)?.translations) &&
                                (data as IForm).translations.map((trans, index) => {
                                    return (
                                        <tr key={trans + index}>
                                            <td className="whitespace-nowrap py-4 text-sm  align-middle font-bold text-dark-tint">
                                                <span className="uppercase">{setLanguageText(trans)}</span>{" "}
                                                <span>
                                                    {trans === (data as IForm).defaultLanguage && "(Form Language)"}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-sm  align-middle text-dark-tint">
                                                {format(parseISO((data as IForm).updatedAt), "dd MMM yyyy")}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-sm  align-middle text-dark-tint">
                                                {trans !== (data as IForm).defaultLanguage && (
                                                    <Link
                                                        to={`${trans}`}
                                                        className="text-primary underline cursor-pointer"
                                                    >
                                                        Edit
                                                    </Link>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-sm  text-center align-middle">
                                                {trans !== (data as IForm).defaultLanguage && (
                                                    <span
                                                        onClick={() =>
                                                            dispatch(
                                                                removeFormLanguage(formId as string, {
                                                                    language: trans,
                                                                }),
                                                            )
                                                        }
                                                        className="material-icons text-danger hover:text-danger-shade cursor-pointer"
                                                    >
                                                        delete
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>
                                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                                        Add translation
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="fixed inset-0 z-20 bg-black/30"></div>
                <div className="fixed inset-0 z-20  flex items-center justify-center p-4">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center">
                        <Dialog.Panel
                            className={"rounded-md border border-solid border-secondary-tint shadow bg-secondary p-4"}
                        >
                            <Dialog.Title className={"text-sm font-bold text-primary mb-2"}>Add language</Dialog.Title>
                            <Dialog.Description className={"text-xs"}>
                                Choose an other language for your form
                            </Dialog.Description>
                            <Combobox value={selectedLanguage} onChange={addFormLanguage}>
                                <div className="relative mt-1">
                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-secondary text-left border border-secondary-tint border-solid focus:outline-none sm:text-sm">
                                        <Combobox.Input
                                            className="w-full capitalize border-none py-2 pl-3 pr-10 text-sm leading-5 text-dark-shade focus:ring-0"
                                            displayValue={(language: { id: string; name: string }) => language.name}
                                            onChange={event => setQuery(event.target.value)}
                                            autoFocus
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <span className="material-icons text-dark-tint">arrow_drop_down</span>
                                        </Combobox.Button>
                                    </div>
                                    <Combobox.Options className="absolute mt-1 shadow max-h-60 w-full overflow-auto rounded-md bg-secondary py-1 text-base focus:outline-none sm:text-sm">
                                        {filteredLanguages.length === 0 && query !== "" ? (
                                            <div className="relative cursor-default select-none py-2 px-4 text-dark-tint">
                                                Nothing found.
                                            </div>
                                        ) : (
                                            filteredLanguages.map(language => (
                                                <Combobox.Option
                                                    key={language.id}
                                                    className={({ active }) =>
                                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                                            active ? "bg-primary text-secondary" : "text-gray-900"
                                                        }`
                                                    }
                                                    value={language}
                                                >
                                                    {language.name}
                                                </Combobox.Option>
                                            ))
                                        )}
                                    </Combobox.Options>
                                </div>
                            </Combobox>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default FormTranslation;
