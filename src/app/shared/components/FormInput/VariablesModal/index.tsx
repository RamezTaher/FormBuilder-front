import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IField } from "../../../../@types";
import { useAppDispatch } from "../../../../store";
import VariableInput from "./VariableInput";
import useUpdatableState from "../../../../hooks/use-updatable-state";
import { IFieldOption } from "../../../../@types/field-option";
import { IFieldVariable } from "../../../../@types/field-variable";
import { updateFieldOptionsVariable } from "../../../../actions/form.actions";

type Props = {
    isModalOpen: boolean;
    onClick: (_state: boolean) => void;
    field: IField;
    isField: boolean;
};

const VariablesModal = ({ isModalOpen, onClick, field, isField }: Props) => {
    const dispatch = useAppDispatch();
    const { formId } = useParams();
    const [allVariables, setAllVariables] = useState(
        field.options.map(op => {
            return {
                operation: "",
                value: "",
                referee: op._id,
            } as { operation: string; value: number | string; referee: string };
        }),
    );
    const [allOptions, setAllOptions] = useUpdatableState(field.options, (a, b) => a === b);

    // const addNewVariable = () => {
    //     let allvs = allVariables;
    //     allvs.push({
    //         referee: field._id as unknown as IField,
    //         operation: "eq",
    //         onReferee: "Field",
    //         values: [],
    //     } as unknown as IFieldVariable);

    //     setAllVariables([...allvs]);
    // };
    const handleOnChangeData = (
        index: number,
        data: { operation: string; value: number | string; referee: string },
    ) => {
        let newVars = allVariables;
        newVars[index] = data;
    };
    return (
        <Dialog open={isModalOpen} onClose={() => onClick(false)}>
            <div className="fixed inset-0 z-20 bg-black/30"></div>
            <div className="fixed inset-0 z-20  flex items-center justify-center p-4">
                {/* Container to center the panel */}
                <div className="flex min-h-full items-center w-full justify-center">
                    <Dialog.Panel
                        className={
                            "rounded-md border border-solid w-[672px] border-secondary-tint shadow bg-secondary p-4"
                        }
                    >
                        <Dialog.Title className={"text-2xl text-dark-shade mb-8 font-semibold"}>Variables</Dialog.Title>
                        <div className="flex flex-col gap-4 ">
                            {
                                // isField
                                // && allVariables.map((v, index) => {
                                //       return <VariableInput key={v._id ? v._id : index} idx={index} variable={v} />;
                                //   })
                                // :
                                allOptions.map((opt, index) => {
                                    return (
                                        <VariableInput
                                            onChange={(idx, data) => handleOnChangeData(idx, data)}
                                            key={opt._id}
                                            idx={index}
                                            options={allOptions}
                                        />
                                    );
                                })
                            }
                            {/* {isField && (
                                <div
                                    onClick={() => addNewVariable()}
                                    className="text-dark cursor-pointer hover:text-dark-shade underline text-sm inline-block"
                                >
                                    + Add new variable
                                </div>
                            )} */}
                        </div>
                        <div className="flex justify-end items-center gap-4 mt-8">
                            <button onClick={() => onClick(false)} className="btn btn-secondary w-28">
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(
                                        updateFieldOptionsVariable(formId as string, field._id, {
                                            vars: allVariables as unknown as IFieldVariable[],
                                        }),
                                    );
                                    onClick(false);
                                }}
                                className="btn btn-primary w-28"
                            >
                                Save
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};

export default VariablesModal;
