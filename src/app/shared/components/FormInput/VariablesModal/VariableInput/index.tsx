import { Combobox, Listbox } from "@headlessui/react";
import React, { useMemo, useState, useEffect } from "react";
import useUpdatableState from "../../../../../hooks/use-updatable-state";
import { IFieldOption } from "../../../../../@types/field-option";

type Props = {
    options: IFieldOption[];
    idx: number;
    onChange: (index: number, _data: { operation: string; value: number | string; referee: string }) => void;
};
const operations = [
    { id: 1, code: "eq", name: "=" },
    // { id: 2, code: "gt", name: ">" },
    // { id: 3, code: "gte", name: ">=" },
    // { id: 4, code: "lte", name: "<=" },
    // { id: 5, code: "lt", name: "<" },
];
const VariableInput = ({ options, idx, onChange }: Props) => {
    const [data, setData] = useState({
        operation: "eq",
        value: options[idx].variable ? options[idx].variable.value : "",
        referee: options[idx]?._id as string,
    });
    const [selectedOperation, setSelectedOperation] = useState(operations[0]);
    const [optionQuery, setOptionQuery] = useState("");
    const [allOptions] = useUpdatableState(options, (a, b) => a === b);
    const [selectedOption, setSelectedOption] = useState<IFieldOption | undefined>(options ? options[idx] : undefined);
    const filteredOptions = useMemo(
        () =>
            optionQuery === ""
                ? allOptions
                : allOptions?.filter(opt =>
                      opt.text[0].text
                          .toLowerCase()
                          .replace(/\s+/g, "")
                          .includes(optionQuery.toLowerCase().replace(/\s+/g, "")),
                  ),
        [optionQuery, allOptions],
    );
    const onChangeData = (input: string, dt: string) => {
        setData({ ...data, [input]: dt });
        console.log(data);
    };
    useEffect(() => {
      onChange(idx, data);
    }, [data])
    
    return (
        <div className="flex justify-between items-end gap-4">
            <div className="w-2/4">
                {
                    <Combobox
                        value={selectedOption}
                        onChange={dt => {
                            setSelectedOption(dt);
                            onChangeData("referee", dt?._id as string);
                        }}
                    >
                        <div className="relative mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-secondary text-left border border-secondary-tint border-solid focus:outline-none sm:text-sm">
                                <Combobox.Input
                                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-dark-shade focus:ring-0"
                                    displayValue={(option: IFieldOption) => option?.text[0].text}
                                    onChange={event => setOptionQuery(event.target.value)}
                                    autoFocus
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 ">
                                    <span className="material-icons text-dark-tint">arrow_drop_down</span>
                                </Combobox.Button>
                            </div>
                            <Combobox.Options className="absolute mt-1 shadow max-h-60 w-full overflow-auto rounded-md bg-secondary py-1 text-base z-20 focus:outline-none sm:text-sm">
                                {filteredOptions &&
                                    filteredOptions.map(opt => (
                                        <Combobox.Option
                                            key={opt._id}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 px-4 ${
                                                    active ? "bg-primary text-secondary" : "text-dark-shade"
                                                }`
                                            }
                                            value={opt}
                                        >
                                            {opt.text[0].text}
                                        </Combobox.Option>
                                    ))}
                            </Combobox.Options>
                        </div>
                    </Combobox>
                }
            </div>

            <Listbox
                value={selectedOperation}
                onChange={data => {
                    setSelectedOperation(data);
                    onChangeData("operation", data.code);
                }}
            >
                <div className="relative ">
                    <Listbox.Button
                        className={
                            "cursor-pointer font-semibold text-dark-shade text-center w-12 overflow-hidden rounded-lg bg-secondary border border-secondary-tint p-2 border-solid focus:outline-none sm:text-sm"
                        }
                    >
                        {selectedOperation.name}
                    </Listbox.Button>
                    <Listbox.Options
                        className={
                            "absolute mt-1 shadow max-h-60 overflow-auto rounded-md bg-secondary py-1 text-base z-20 focus:outline-none sm:text-sm w-12"
                        }
                    >
                        {operations.map(operation => (
                            <Listbox.Option
                                className={({ active }) =>
                                    `relative font-medium cursor-pointer text-center select-none py-2 px-4 ${
                                        active ? "bg-primary text-secondary" : "text-dark-shade"
                                    }`
                                }
                                key={operation.id}
                                value={operation}
                            >
                                {operation.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
            <input
                type="number"
                value={data.value ? data.value : ""}
                onChange={e => onChangeData("value", e.target.value)}
                className="px-4 w-1/4"
            />
        </div>
    );
};

export default VariableInput;
