import React from "react";
import { useParams } from "react-router-dom";
import { IForm } from "../../@types";
import Spinner from "../../shared/components/Spinner";
import { useAppDispatch, useAppSelector } from "../../store";

type Props = {};

const SubmissionSuccess = (props: Props) => {
    const { data, isLoading } = useAppSelector(state => state.form);
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className="bg-secondary-shade min-h-screen">
            <div className="max-w-2xl w-full mx-auto p-8">
                <div
                    className={`border text-dark-shade border-t-8 text-4xl font-semibold mb-4 rounded bg-secondary border-primary border-solid p-8`}
                >
                    Your response saved successfully.
                </div>
            </div>
        </div>
    );
};

export default SubmissionSuccess;
