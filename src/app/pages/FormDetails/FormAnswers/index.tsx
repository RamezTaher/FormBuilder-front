import { format, parseISO } from "date-fns";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFormSubmissionAnalysis } from "../../../actions/form.actions";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ISubmissionAnalysis } from "../../../@types";
import Spinner from "../../../shared/components/Spinner";
import { Answer } from "../../../@types/submission";

type Props = {};

const FormAnswers = (props: Props) => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.submission);
    const { formId } = useParams();
    useEffect(() => {
        dispatch(getFormSubmissionAnalysis(formId as string));
    }, [formId]);
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className="py-6 min-h-full h-screen">
            <h1 className="text-dark font-bold text-2xl flex justify-start items-center gap-2 mb-8">
                <div className="text-dark-tint">Answers </div>
            </h1>
            <div className="border border-solid border-secondary-tint rounded-md overflow-hidden bg-secondary p-2">
                {data && (
                    <table className="min-w-full divide-y divide-gray-300 ">
                        <thead className="text-dark-tint">
                            <tr>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    Identifier
                                </th>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    Email
                                </th>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    {(data as ISubmissionAnalysis[])[0]?.scores[0] &&
                                        (data as ISubmissionAnalysis[])[0]?.scores[0]?.name}
                                </th>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    {(data as ISubmissionAnalysis[])[0]?.scores[1] &&
                                        (data as ISubmissionAnalysis[])[0]?.scores[1]?.name}
                                </th>
                                <th className="text-left text-sm border-b border-solid border-secondary-tint px-1 pb-2">
                                    {(data as ISubmissionAnalysis[])[0]?.scores[2] &&
                                        (data as ISubmissionAnalysis[])[0]?.scores[2]?.name}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Array.isArray(data) &&
                                (data as ISubmissionAnalysis[]).map((sub, index) => {
                                    return (
                                       sub &&( <tr key={sub._id}>
                                            <td className="whitespace-nowrap py-4 text-sm  align-middle font-bold text-dark-tint">
                                                {sub.submission.answers[0]?.value}
                                            </td>
                                            <td className="whitespace-nowrap py-4 text-sm  align-middle font-bold text-dark-tint">
                                                {sub.submission.answers[1]?.value}
                                            </td>
                                            {sub?.scores[0] && (
                                                <td className={`whitespace-nowrap py-4 text-sm  align-middle `}>
                                                    <div className="flex justify-start items-center gap-1">
                                                        <span
                                                            className={`material-icons ${
                                                                sub?.scores[0]?.value > 2.33 && "text-danger"
                                                            } ${
                                                                sub?.scores[0]?.value < 2.34 &&
                                                                sub?.scores[0]?.value > 1.64 &&
                                                                "text-warning"
                                                            } ${sub?.scores[0]?.value < 1.64 && "text-success"}`}
                                                        >
                                                            info
                                                        </span>
                                                        <div
                                                            className={`font-bold ${
                                                                sub?.scores[0]?.value > 2.33 && "text-danger"
                                                            } ${
                                                                sub?.scores[0]?.value < 2.34 &&
                                                                sub?.scores[0]?.value > 1.64 &&
                                                                "text-warning"
                                                            } ${sub?.scores[0]?.value < 1.64 && "text-success"}`}
                                                        >
                                                            {sub?.scores[0]?.value.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                            {sub?.scores[1] && (
                                                <td className={`whitespace-nowrap py-4 text-sm align-middle `}>
                                                    <div className="flex justify-start items-center gap-1">
                                                        <span
                                                            className={`material-icons ${
                                                                sub?.scores[1]?.value > 2.33 && "text-danger"
                                                            } ${
                                                                sub?.scores[1]?.value < 2.34 &&
                                                                sub?.scores[1]?.value > 1.64 &&
                                                                "text-warning"
                                                            } ${sub?.scores[1]?.value < 1.64 && "text-success"}`}
                                                        >
                                                            info
                                                        </span>
                                                        <div
                                                            className={`font-bold ${
                                                                sub?.scores[1]?.value > 2.33 && "text-danger"
                                                            } ${
                                                                sub?.scores[1]?.value < 2.34 &&
                                                                sub?.scores[1]?.value > 1.64 &&
                                                                "text-warning"
                                                            } ${sub?.scores[1]?.value < 1.64 && "text-success"}`}
                                                        >
                                                            {sub?.scores[1]?.value.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                            {sub?.scores[2] && (
                                                <td
                                                    className={`whitespace-nowrap py-4 text-sm flex justify-start items-center gap-2 align-middle `}
                                                >
                                                    <div className="flex justify-start items-center gap-1">
                                                        <span
                                                            className={`material-icons ${
                                                                sub?.scores[2]?.value > 2.33 && "text-danger"
                                                            } ${
                                                                sub?.scores[2]?.value < 2.34 &&
                                                                sub?.scores[2]?.value > 1.64 &&
                                                                "text-warning"
                                                            } ${sub?.scores[2]?.value < 1.64 && "text-success"}`}
                                                        >
                                                            info
                                                        </span>
                                                        <div
                                                            className={`font-bold ${
                                                                sub?.scores[2]?.value > 2.33 && "text-danger"
                                                            } ${
                                                                sub?.scores[2]?.value < 2.34 &&
                                                                sub?.scores[2]?.value > 1.64 &&
                                                                "text-warning"
                                                            } ${sub?.scores[2]?.value < 1.64 && "text-success"}`}
                                                        >
                                                            {sub?.scores[2]?.value.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>)
                                    );
                                })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default FormAnswers;
