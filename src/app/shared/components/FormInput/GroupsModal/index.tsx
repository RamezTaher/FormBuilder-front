import { Combobox, Dialog } from "@headlessui/react";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { IFieldGroup } from "../../../../@types";
import useUpdatableState from "../../../../hooks/use-updatable-state";
import { useAppDispatch } from "../../../../store";
import { IField } from "../../../../@types/field";
import { updateFieldGroup, updateGroupType } from "../../../../actions/form.actions";
import { IGroupType } from "../../../../@types/group-type";

type Props = {
    isModalOpen: boolean;
    onClick: (_state: boolean) => void;
    groups: IFieldGroup[];
    field: IField;
    groupTypes: IGroupType[];
};

const GroupsModal = ({ isModalOpen, onClick, groups, field, groupTypes }: Props) => {
    const dispatch = useAppDispatch();
    const { formId } = useParams();
    const [allGroups] = useUpdatableState(groups, (a, b) => a === b);
    const [selectedGroup, setSelectedGroup] = useUpdatableState<IFieldGroup | undefined>(
        groups && groups.find(g => g._id === (field.group?._id as unknown as string)),
        (a, b) => a === b,
    );
    const [query, setQuery] = useState("");

    const [sectionQuery, setSectionQuery] = useState("");
    const [allSections] = useUpdatableState(groupTypes, (a, b) => a === b);
    const [selectedSection, setSelectedSection] = useState<IGroupType | undefined>(
        groupTypes && groupTypes.find(gt => gt._id === (field.group?.type as unknown as string)),
    );

    const filteredGroups = useMemo(
        () =>
            query === ""
                ? allGroups
                : allGroups.filter(group =>
                      group.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")),
                  ),
        [query, allGroups],
    );
    const filteredSections = useMemo(
        () =>
            sectionQuery === ""
                ? allSections
                : allSections.filter(type =>
                      type.name
                          .toLowerCase()
                          .replace(/\s+/g, "")
                          .includes(sectionQuery.toLowerCase().replace(/\s+/g, "")),
                  ),
        [sectionQuery, allSections],
    );
    const changeFieldGroup = (data: IFieldGroup) => {
        setSelectedGroup(data);
        dispatch(updateFieldGroup(formId as string, field._id, { group: data }));
    };
    const changeGroupType = (data: IFieldGroup) => {
        setSelectedSection(data);
        dispatch(updateGroupType(formId as string, field._id, selectedGroup?._id as string, { groupType: data }));
    };
    return (
        <Dialog open={isModalOpen} onClose={() => onClick(false)}>
            <div className="fixed inset-0 z-20 bg-black/30"></div>
            <div className="fixed inset-0 z-20  flex items-center justify-center p-4">
                {/* Container to center the panel */}
                <div className="flex min-h-full items-center justify-center">
                    <Dialog.Panel
                        className={"rounded-md border border-solid w-80 border-secondary-tint shadow bg-secondary p-4"}
                    >
                        <Dialog.Title className={"text-2xl text-dark-shade mb-8 font-semibold"}>
                            Groups And Sections
                        </Dialog.Title>
                        <div className="mb-2">
                            <div className="text-lg text-dark-shade mb-2">Groups</div>
                            <Combobox value={selectedGroup} onChange={changeFieldGroup}>
                                <div className="relative mt-1">
                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-secondary text-left border border-secondary-tint border-solid focus:outline-none sm:text-sm">
                                        <Combobox.Input
                                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-dark-shade focus:ring-0"
                                            displayValue={(group: IFieldGroup) => group?.name}
                                            onChange={event => setQuery(event.target.value)}
                                            autoFocus
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <span className="material-icons text-dark-tint">arrow_drop_down</span>
                                        </Combobox.Button>
                                    </div>
                                    <Combobox.Options className="absolute mt-1 shadow max-h-60 w-full z-20 overflow-auto rounded-md bg-secondary py-1 text-base focus:outline-none sm:text-sm">
                                        {filteredGroups.length === 0 && query !== "" ? (
                                            <Combobox.Option
                                                as="div"
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 px-4 ${
                                                        active ? "bg-primary text-secondary" : "text-dark-shade"
                                                    }`
                                                }
                                                value={{ _id: null, name: query, type: "" }}
                                            >
                                                Create "{query}"
                                            </Combobox.Option>
                                        ) : (
                                            filteredGroups &&
                                            filteredGroups.map(group => (
                                                <Combobox.Option
                                                    key={group._id}
                                                    className={({ active }) =>
                                                        `relative cursor-pointer select-none py-2 px-4 ${
                                                            active ? "bg-primary text-secondary" : "text-dark-shade"
                                                        }`
                                                    }
                                                    value={group}
                                                >
                                                    {group.name}
                                                </Combobox.Option>
                                            ))
                                        )}
                                    </Combobox.Options>
                                </div>
                            </Combobox>
                        </div>
                        <div>
                            <div className="text-lg text-dark-shade mb-2">Sections</div>
                            <Combobox value={selectedSection} onChange={changeGroupType}>
                                <div className="relative mt-1">
                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-secondary text-left border border-secondary-tint border-solid focus:outline-none sm:text-sm">
                                        <Combobox.Input
                                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-dark-shade focus:ring-0"
                                            displayValue={(section: IGroupType) => section?.name}
                                            onChange={event => setSectionQuery(event.target.value)}
                                            autoFocus
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 ">
                                            <span className="material-icons text-dark-tint">arrow_drop_down</span>
                                        </Combobox.Button>
                                    </div>
                                    <Combobox.Options className="absolute mt-1 shadow max-h-60 w-full overflow-auto rounded-md bg-secondary py-1 text-base z-20 focus:outline-none sm:text-sm">
                                        {filteredSections.length === 0 && sectionQuery !== "" ? (
                                            <Combobox.Option
                                                as="div"
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 px-4 ${
                                                        active ? "bg-primary text-secondary" : "text-dark-shade"
                                                    }`
                                                }
                                                value={{ _id: null, name: sectionQuery }}
                                            >
                                                Create "{sectionQuery}"
                                            </Combobox.Option>
                                        ) : (
                                            filteredSections &&
                                            filteredSections.map(type => (
                                                <Combobox.Option
                                                    key={type._id}
                                                    className={({ active }) =>
                                                        `relative cursor-pointer select-none py-2 px-4 ${
                                                            active ? "bg-primary text-secondary" : "text-dark-shade"
                                                        }`
                                                    }
                                                    value={type}
                                                >
                                                    {type.name}
                                                </Combobox.Option>
                                            ))
                                        )}
                                    </Combobox.Options>
                                </div>
                            </Combobox>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};

export default GroupsModal;
