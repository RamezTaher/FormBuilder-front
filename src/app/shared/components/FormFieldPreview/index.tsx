import { IField } from "../../../@types";
import useUpdatableState from "../../../hooks/use-updatable-state";

type Props = {
    isSelected: boolean;
    field: IField;
    onSelect: () => void;
    onChange: (idx: boolean, _value: string | number) => void;
    value: string | number | (string | number)[];
};

const FormFieldPreview = ({ field, isSelected, onSelect, onChange, value }: Props) => {
    const [localValue] = useUpdatableState(value, (a, b) => a === b);

    const setIsRequired = () => {
        if (field.isRequired) {
            if ((localValue as (string | number)[]).length > 0) {
                return false;
            } else if ((localValue as (string | number)[]).length !== 0 && (localValue as string | number) !== "") {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };
    const initInput = (field: IField) => {
        switch (field.type) {
            case "paragraph":
                return (
                    <textarea
                        onChange={e => {
                            onChange(false, e.currentTarget.value);
                        }}
                        value={localValue as string | number}
                        placeholder={"paragraph text"}
                        className="w-full lg:w-1/2"
                        required={field.isRequired}
                    />
                );
            case "short-answer":
                return (
                    <input
                        onChange={e => {
                            onChange(false, e.currentTarget.value);
                        }}
                        value={localValue as string | number}
                        type="text"
                        placeholder={"short answer text"}
                        className="w-full lg:w-1/2"
                        required={field.isRequired}
                    />
                );
            case "checkboxes":
                return (
                    <div className="w-full capitalize">
                        {field.options &&
                            field.options.map((option, index: number) => {
                                return (
                                    <div key={option._id} className={`flex items-center justify-start`}>
                                        <input
                                            id={`opt-${option._id}`}
                                            name={`opt-${option._id}`}
                                            value={option.value}
                                            required={setIsRequired()}
                                            type="checkbox"
                                            checked={
                                                option.value ===
                                                (localValue &&
                                                    (localValue as (string | number)[])[
                                                        (localValue as (string | number)[]).indexOf(option.value) ?? -1
                                                    ])
                                            }
                                            onChange={() => onChange(true, option.value)}
                                            className="form-checkbox h-4 w-4 outline-none ring-offset-0 cursor-pointer text-primary border-dark ring-0 checked:border-primary"
                                        />
                                        <label
                                            htmlFor={`opt-${option._id}`}
                                            className="ml-2 block text-sm text-dark-shade cursor-pointer"
                                        >
                                            {option.text[0].text}
                                        </label>
                                    </div>
                                );
                            })}
                    </div>
                );
            case "radio":
                return (
                    <div className="w-full capitalize">
                        {field.options &&
                            field.options.map((option, index: number) => {
                                return (
                                    <div key={option._id} className={`flex items-center justify-start`}>
                                        <input
                                            checked={option.value === localValue}
                                            value={option.value}
                                            required={setIsRequired()}
                                            id={`opt-${option._id}`}
                                            name={`opt-${option._id}`}
                                            onChange={() => onChange(false, option.value)}
                                            type="radio"
                                            className="form-radio h-4 w-4 outline-none ring-offset-0 cursor-pointer text-primary ring-0 border-dark checked:border-primary"
                                        />
                                        <label
                                            htmlFor={`opt-${option._id}`}
                                            className="ml-2 block text-sm text-dark-shade cursor-pointer"
                                        >
                                            {option.text[0].text}
                                        </label>
                                    </div>
                                );
                            })}
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div
            key={field._id}
            onClick={() => onSelect()}
            className={`border rounded bg-secondary ${
                isSelected ? "border-primary" : "border-secondary-tint"
            } border-solid p-8`}
        >
            <div className="text-xl text-dark-shade font-medium mb-8 flex justify-start items-center">
                {field.question[0].question} {field.isRequired && <span className="text-danger-shade">*</span>}
            </div>
            {initInput(field)}
        </div>
    );
};

export default FormFieldPreview;
