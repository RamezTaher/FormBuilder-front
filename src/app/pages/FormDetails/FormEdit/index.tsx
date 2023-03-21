import React, { useRef, useState } from "react";
import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { addFieldToForm, getForm, updateFormTitle } from "../../../actions/form.actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { IField, IForm } from "../../../@types";
import FormInput from "../../../shared/components/FormInput";
import { useClickAway } from "react-use";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import useUpdatableState from "../../../hooks/use-updatable-state";
import Spinner from "../../../shared/components/Spinner";
type Props = {};
type FormInputs = {
    title: string;
};

const FormEdit = (props: Props) => {
    const dispatch = useAppDispatch();
    const { data, isLoading, isSuccess } = useAppSelector(state => state.form);
    const { formId } = useParams();
    const [selectedField, setSelectedField] = useState<IField | null>(null);
    const [fields, setFields] = useUpdatableState((data as IForm)?.fields, (a, b) => a === b);
    const { register, handleSubmit, reset } = useForm<FormInputs>();
    useEffect(() => {
        dispatch(getForm(formId as string));
    }, [formId]);
    useEffect(() => {
        if (isSuccess && !isLoading && (data as IForm)?.titles) {
            reset({
                title: (data as IForm)?.titles[0].text,
            });
        }
    }, [isLoading]);
    const fieldsRef = useRef(null);
    useClickAway(fieldsRef, () => {
        setSelectedField(null);
    });
    const updateTitle: SubmitHandler<FormInputs> = async formData => {
        dispatch(await updateFormTitle(formId as string, (data as IForm).titles[0]._id, formData.title));
    };
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(fields, result.source.index, result.destination.index);
        setFields([...items]);
    };
    const reorder = (list: IField[], startIndex: number, endIndex: number) => {
        const result = list;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <div className="bg-secondary-shade min-h-screen h-full">
                {data && !Array.isArray(data) && (
                    <div className="py-4 pb-20 px-6 container sm:mx-auto">
                        <div className="flex justify-between items-center mb-12">
                            <form onSubmit={handleSubmit(updateTitle)} className="flex justify-start items-center ">
                                <input
                                    {...register("title")}
                                    type="text"
                                    className="min-w-fit w-fit bg-transparent border-none text-2xl text-dark-shade font-bold"
                                />

                                <button
                                    type="submit"
                                    className="bg-secondary-tint px-1.5 py-0.5 flex justify-center items-center rounded hover:bg-dark-tint/50 cursor-pointer"
                                >
                                    <span className="material-icons text-2xl text-dark-shade">edit</span>
                                </button>
                            </form>
                            <div className="flex justify-end items-center gap-4">
                                <Link to={`/form/s/${formId as string}`} className="btn btn-primary py-1.5">
                                    Share
                                </Link>
                            </div>
                        </div>
                        <div ref={fieldsRef} className="relative w-11/12 h-full">
                            <div
                                onClick={() =>
                                    dispatch(
                                        addFieldToForm(formId as string, {
                                            order: selectedField?.order as number,
                                            type: "short-answer",
                                        }),
                                    )
                                }
                                className="flex justify-center items-center cursor-pointer bg-primary fixed right-20 shadow rounded w-12 h-12"
                            >
                                <span className="material-icons text-secondary text-4xl">add</span>
                            </div>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppableFields">
                                    {provided => (
                                        <div
                                            className=" h-full space-y-4"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {fields &&
                                                fields.map((field: IField, index: number) => {
                                                    return (
                                                        <Draggable
                                                            key={field._id}
                                                            draggableId={field._id}
                                                            index={index}
                                                        >
                                                            {provided => (
                                                                <FormInput
                                                                    idx={index}
                                                                    groupTypes={(data as IForm)?.groupTypes}
                                                                    groups={(data as IForm)?.groups}
                                                                    draggableProps={provided.draggableProps}
                                                                    innerRef={provided.innerRef}
                                                                    dragHandleProps={provided.dragHandleProps}
                                                                    onSelect={() => {
                                                                        setSelectedField(field);
                                                                    }}
                                                                    field={{ ...field, order: index }}
                                                                    isSelected={field._id === selectedField?._id}
                                                                />
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default FormEdit;
