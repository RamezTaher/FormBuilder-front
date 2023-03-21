import { format, parseISO } from "date-fns";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IForm } from "../../@types";
import { createForm, deleteForm, getAllForms } from "../../actions/form.actions";
import { useAppDispatch, useAppSelector } from "../../store";
import { Fragment } from "react";
import { Menu } from "@headlessui/react";

type Props = {};

const Forms = (props: Props) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.form);
    useEffect(() => {
        dispatch(getAllForms());
    }, []);
    const createNewForm = () => {
        dispatch(createForm());
    };
    return (
        <Fragment>
            <div className="border-b border-solid border-secondary-tint">
                <div className="container px-6 py-4 sm:mx-auto">
                    <button onClick={() => createNewForm()} className="btn btn-primary w-48 ms-auto">
                        New Form
                    </button>
                </div>
            </div>
            <div className="py-4 px-6 container sm:mx-auto">
                <div className="grid grid-cols-6 gap-6 2xl:gap-12">
                    {Array.isArray(data) &&
                        data.map((form: IForm) => {
                            return (
                                <div
                                    key={form._id}
                                    className="flex flex-col justify-start border border-secondary-tint border-solid h-56 rounded hover:border-primary focus:border-primary cursor-pointer"
                                >
                                    <Link
                                        to={`/forms/${form._id}/answers`}
                                        className="p-3 h-2/3 bg-secondary-tint rounded-t flex justify-center items-center"
                                    >
                                        <span className="material-icons text-8xl text-dark-shade/70">list_alt</span>
                                    </Link>
                                    <div className="p-3 h-1/3">
                                        <div className="font-bold text-dark truncate">{form.titles[0].text}</div>
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="font-light text-dark text-xs">
                                                {format(parseISO(form.updatedAt), "dd MMM yyyy")}
                                            </div>
                                            <div className="relative">
                                                <Menu as="div" className={"relative"}>
                                                    <Menu.Button>
                                                        <span className="material-icons text-dark-tint">more_vert</span>
                                                    </Menu.Button>
                                                    <Menu.Items
                                                        as="div"
                                                        className={
                                                            "absolute w-36 min-w-fit bg-secondary shadow rounded first:rounded-t"
                                                        }
                                                    >
                                                        <Menu.Item>
                                                            <div
                                                                onClick={() => dispatch(deleteForm(form._id))}
                                                                className={`text-xs p-2 cursor-pointe  text-dark-shade hover:bg-secondary-shade rounded-t border-b border-solid border-secondary-shade`}
                                                            >
                                                                Delete
                                                            </div>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </Fragment>
    );
};

export default Forms;
