import { Listbox, Menu, Switch } from "@headlessui/react";
import React, { ChangeEvent, Fragment, LegacyRef, useEffect, useRef, useState } from "react";
import { IField } from "../../../@types/field";
import { useAppDispatch } from "../../../store";
import { useParams } from "react-router-dom";
import {
    addFieldOption,
    deleteFieldOption,
    deleteFormField,
    updateFieldOptions,
    updateFormField,
} from "../../../actions/form.actions";
import { useDebounce } from "react-use";
import {
    DraggableProvidedDragHandleProps,
    DraggableProvidedDraggableProps,
    DragDropContext,
    Droppable,
    DropResult,
    Draggable,
} from "react-beautiful-dnd";
import useUpdatableState from "../../../hooks/use-updatable-state";
import { IFieldOption } from "../../../@types/field-option";
import GroupsModal from "./GroupsModal";
import { IFieldGroup } from "../../../@types/field-group";
import { IGroupType } from "../../../@types/group-type";
import VariablesModal from "./VariablesModal";

type Props = {
    isSelected: boolean;
    field: IField;
    onSelect: () => void;
    innerRef: LegacyRef<HTMLDivElement>;
    dragHandleProps: DraggableProvidedDragHandleProps | undefined;
    draggableProps: DraggableProvidedDraggableProps;
    groups: IFieldGroup[];
    groupTypes: IGroupType[];
    idx: number
};

type InputType = {
    icon: string;
    name: string;
    type: string;
};
const inputTypes: InputType[] = [
    {
        icon: "notes",
        name: "paragraph",
        type: "paragraph",
    },
    {
        icon: "short_text",
        name: "short answer",
        type: "short-answer",
    },
    {
        icon: "radio_button_checked",
        name: "multiple choice",
        type: "radio",
    },
    {
        icon: "check_box",
        name: "checkboxes",
        type: "checkboxes",
    },
];
const FormInput = ({
    groups,
    groupTypes,
    isSelected,
    field,
    onSelect,
    dragHandleProps,
    draggableProps,
    innerRef,
    idx
}: Props) => {
    const [selectedType, setSelectedType] = useState<InputType>(
        inputTypes.filter(element => element.type === field.type)[0],
    );
    const dispatch = useAppDispatch();
    const { formId } = useParams();
    const [question, setQuestion] = useState(field.question[0].question);
    const [order] = useUpdatableState(idx);
    const [isRequired, setIsRequired] = useState(field.isRequired);
    const isMounted = useRef(false);
    const [options, setOptions] = useUpdatableState(field.options, (a, b) => a === b);

    const [isVariableModalOpen, setIsVariableModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const onChangeOptionText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let newOptions = options;
        newOptions[index].text[0].text = e.currentTarget.value;

        setOptions([...newOptions]);
    };
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(options, result.source.index, result.destination.index);
        setOptions([...items]);
    };
    const reorder = (list: IFieldOption[], startIndex: number, endIndex: number) => {
        const result = list;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    useDebounce(
        () => {
            if (isMounted.current) {
                dispatch(
                    updateFormField(formId as string, field._id, {
                        question: { _id: field.question[0]._id, text: question },
                        order: order,
                        type: selectedType.type,
                        isRequired: isRequired,
                    }),
                );
            } else {
                isMounted.current = true;
            }
        },
        1000,
        [question, selectedType, order, isRequired],
    );
    useDebounce(
        () => {
            if (isMounted.current && options) {
                dispatch(updateFieldOptions(formId as string, field._id, { options: options }));
            } else {
                isMounted.current = true;
            }
        },
        1000,
        [options],
    );

    const initInput = (inputField: InputType) => {
        switch (inputField.type) {
            case "paragraph":
                return (
                    <div className="w-full capitalize lg:w-1/2 border-b-2 border-solid border-dark-tint/50 text-dark-tint/50 py-2">
                        paragraph text
                    </div>
                );
            case "short-answer":
                return (
                    <div className="w-full capitalize lg:w-1/2 border-b-2 border-solid border-dark-tint/50 text-dark-tint/50 py-2">
                        short answer text
                    </div>
                );
            case "checkboxes":
                return (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={`droppableOptions-${field._id}`}>
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="w-full capitalize">
                                    {options &&
                                        options.map((option, index: number) => {
                                            return (
                                                <Draggable key={option._id} draggableId={option._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}
                                                            className={`flex items-center justify-start`}
                                                        >
                                                            <div className="flex justify-start items-center gap-4 w-full group">
                                                                <span
                                                                    {...provided.dragHandleProps}
                                                                    className={`material-icons text-lg text-dark-shade cursor-move invisible ${
                                                                        isSelected && "group-hover:visible"
                                                                    }`}
                                                                >
                                                                    drag_indicator
                                                                </span>

                                                                <div className="w-5 h-5 border border-solid border-dark-tint"></div>
                                                                <input
                                                                    onChange={e => onChangeOptionText(e, index)}
                                                                    type="text"
                                                                    value={option.text[0].text}
                                                                    className={`border-transparent focus:border-primary w-10/12 group-hover:border-secondary-shade`}
                                                                />
                                                            </div>
                                                            {isSelected && (
                                                                <button
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            deleteFieldOption(
                                                                                formId as string,
                                                                                field._id,
                                                                                {
                                                                                    fieldOrder: field.order,
                                                                                    fieldOptionId: option._id,
                                                                                },
                                                                            ),
                                                                        )
                                                                    }
                                                                    type="button"
                                                                    className="bg-secondary px-1.5 py-0.5 flex justify-center items-center rounded hover:bg-secondary-shade cursor-pointer"
                                                                >
                                                                    <span className="material-icons text-dark text-2xl">
                                                                        close
                                                                    </span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    {provided.placeholder}
                                    <div
                                        onClick={() =>
                                            dispatch(
                                                addFieldOption(formId as string, field._id, {
                                                    order: options.length + 1,
                                                }),
                                            )
                                        }
                                        className="text-dark cursor-pointer hover:text-dark-shade underline ms-8 text-sm my-4 inline-block"
                                    >
                                        Add Option
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                );
            case "radio":
                return (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={`droppableOptions-${field._id}`}>
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="w-full capitalize">
                                    {options &&
                                        options.map((option, index: number) => {
                                            return (
                                                <Draggable key={option._id} draggableId={option._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}
                                                            className={`flex items-center justify-start`}
                                                        >
                                                            <div className="flex justify-start items-center gap-4 w-full group">
                                                                <span
                                                                    {...provided.dragHandleProps}
                                                                    className={`material-icons text-lg text-dark-shade cursor-move invisible ${
                                                                        isSelected && "group-hover:visible"
                                                                    }`}
                                                                >
                                                                    drag_indicator
                                                                </span>

                                                                <div className="w-5 h-5 rounded-full border border-solid border-dark-tint"></div>
                                                                <input
                                                                    onChange={e => onChangeOptionText(e, index)}
                                                                    type="text"
                                                                    value={option.text[0].text}
                                                                    className={`border-transparent focus:border-primary w-10/12 group-hover:border-secondary-shade`}
                                                                />
                                                            </div>
                                                            {isSelected && (
                                                                <button
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            deleteFieldOption(
                                                                                formId as string,
                                                                                field._id,
                                                                                {
                                                                                    fieldOrder: field.order,
                                                                                    fieldOptionId: option._id,
                                                                                },
                                                                            ),
                                                                        )
                                                                    }
                                                                    type="button"
                                                                    className="bg-secondary px-1.5 py-0.5 flex justify-center items-center rounded hover:bg-secondary-shade cursor-pointer"
                                                                >
                                                                    <span className="material-icons text-dark text-2xl">
                                                                        close
                                                                    </span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    {provided.placeholder}
                                    <div
                                        onClick={() =>
                                            dispatch(
                                                addFieldOption(formId as string, field._id, {
                                                    order: options.length + 1,
                                                }),
                                            )
                                        }
                                        className="text-dark cursor-pointer hover:text-dark-shade underline ms-8 text-sm my-4 inline-block"
                                    >
                                        Add Option
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                );
            default:
                return null;
        }
    };
    return (
        <div
            {...draggableProps}
            ref={innerRef}
            onClick={() => onSelect()}
            className={`border rounded bg-secondary ${
                isSelected ? "border-primary" : "border-secondary-tint"
            } border-solid p-6 ${isSelected ? "pt-1" : "pt-6"}`}
        >
            {isSelected ? (
                <Fragment>
                    <div
                        {...dragHandleProps}
                        className="px-1.5 py-0.5 cursor-move flex justify-center items-center rounded"
                    >
                        <span className="material-icons text-dark-shade text-2xl transform rotate-90 mb-3">
                            drag_indicator
                        </span>
                    </div>
                    <div className="flex justify-between items-center gap-6 mb-8 ">
                        <input
                            value={question}
                            onChange={e => setQuestion(e.currentTarget.value)}
                            className="w-1/2 text-xl text-dark-shade font-medium"
                            type="text"
                            placeholder={"Question"}
                        />
                        <div className="relative ms-auto">
                            <Listbox value={selectedType} onChange={setSelectedType}>
                                {({ open }) => (
                                    <Fragment>
                                        <Listbox.Button
                                            className={
                                                "flex justify-between items-center gap-4 border border-solid border-secondary-tint px-4 py-2 rounded w-56"
                                            }
                                        >
                                            <div className="flex justify-start items-center gap-4">
                                                <span className="material-icons text-dark text-lg">
                                                    {selectedType.icon}
                                                </span>
                                                <div className="text-dark font-medium capitalize">
                                                    {selectedType.name}
                                                </div>
                                            </div>
                                            <span
                                                className={`material-icons text-dark text-lg transform transition-transform duration-200 ease-in-out ${
                                                    open ? "rotate-180" : ""
                                                }`}
                                            >
                                                expand_more
                                            </span>
                                        </Listbox.Button>
                                        <Listbox.Options className={"absolute bg-secondary w-full shadow-md  rounded"}>
                                            {inputTypes.map((inputType, index) => (
                                                <Listbox.Option
                                                    key={index}
                                                    value={inputType}
                                                    as="div"
                                                    className={
                                                        "flex items-center justify-start gap-4 px-4 py-2 cursor-pointer hover:bg-secondary-shade"
                                                    }
                                                >
                                                    <span className="material-icons text-dark text-lg">
                                                        {inputType.icon}
                                                    </span>
                                                    <div className="text-dark font-medium capitalize">
                                                        {inputType.name}
                                                    </div>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Fragment>
                                )}
                            </Listbox>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <button
                                type="button"
                                className="bg-secondary px-1.5 py-0.5 flex justify-center items-center rounded hover:bg-secondary-shade cursor-pointer"
                            >
                                <span className="material-icons text-dark text-2xl">content_copy</span>
                            </button>
                            <button
                                onClick={() => dispatch(deleteFormField(formId as string, field._id))}
                                type="button"
                                className="bg-secondary px-1.5 py-0.5 flex justify-center items-center rounded hover:bg-secondary-shade cursor-pointer"
                            >
                                <span className="material-icons text-dark text-2xl">delete_outline</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center"></div>
                </Fragment>
            ) : (
                <div className="text-xl text-dark-shade font-medium mb-8 flex justify-start items-center">
                    {question}
                    {field.isRequired && <span className="text-danger-shade">*</span>}
                    <div
                        {...dragHandleProps}
                        className="px-1.5 py-0.5 invisible cursor-move flex justify-center items-center rounded"
                    >
                        <span className="material-icons text-dark-shade text-2xl transform rotate-90 mb-3">
                            drag_indicator
                        </span>
                    </div>
                </div>
            )}
            {initInput(selectedType)}
            {isSelected && (
                <div className="mt-10 pt-4 flex justify-between items-center border-t-2 border-solid border-primary/50">
                    <Switch.Group as={"div"} className="flex justify-start items-center gap-2">
                        <Switch
                            checked={isRequired}
                            onChange={setIsRequired}
                            className={`${
                                isRequired ? "bg-primary/50" : "bg-secondary-shade"
                            }  h-3 relative cursor-pointer w-6 rounded-full transition-colors duration-200 ease-in-out`}
                        >
                            <span
                                aria-hidden="true"
                                className={`${
                                    isRequired ? "translate-x-0 bg-primary" : "-translate-x-3 bg-secondary-tint"
                                } pointer-events-none absolute top-[calc(50%-8px)] h-4 w-4 transform rounded-full  transition duration-200 ease-in-out`}
                            />
                        </Switch>
                        <Switch.Label className="text-sm">Required</Switch.Label>
                    </Switch.Group>
                    <Menu as="div" className={"relative"}>
                        <Menu.Button>
                            <span className="material-icons text-dark-tint">more_vert</span>
                        </Menu.Button>
                        <Menu.Items
                            as="div"
                            className={"absolute w-36 min-w-fit bg-secondary shadow rounded first:rounded-t"}
                        >
                            <Menu.Item>
                                <div
                                    onClick={() => setIsVariableModalOpen(true)}
                                    className={`text-sm p-2 cursor-pointer text-dark-shade hover:bg-secondary-shade rounded-t border-b border-solid border-secondary-shade`}
                                >
                                    Variables
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    onClick={() => setIsGroupModalOpen(true)}
                                    className={`text-sm p-2 cursor-pointer text-dark-shade hover:bg-secondary-shade rounded-b`}
                                >
                                    Groups
                                </div>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            )}
            <GroupsModal
                groupTypes={groupTypes}
                field={field}
                groups={groups}
                isModalOpen={isGroupModalOpen}
                onClick={state => setIsGroupModalOpen(state)}
            />
            <VariablesModal
                field={field}
                isField={field.options.length > 0 ? false : true}
                isModalOpen={isVariableModalOpen}
                onClick={state => setIsVariableModalOpen(state)}
            />
        </div>
    );
};

export default FormInput;
