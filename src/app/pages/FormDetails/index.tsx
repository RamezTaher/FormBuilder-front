import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, Link, NavLink } from "react-router-dom";

type Props = {};

const FormDetails = (props: Props) => {
    const { t } = useTranslation(["common"]);
    return (
        <div>
            <div className="flex justify-between h-16 relative z-10 border-b border-solid border-secondary-shade shadow-sm">
                <NavLink
                    to="answers"
                    className={({ isActive }) =>
                        `p-4 w-1/3 h-full text-center font-bold text-xl  capitalize ${
                            isActive ? "text-primary" : "text-dark bg-secondary-shade"
                        }`
                    }
                >
                    {t("common:answer_plural")}
                </NavLink>
                <div className="bg-secondary-shade h-full flex justify-center items-center">
                    <div className="w-0.5 h-8 bg-dark-tint"></div>
                </div>
                <NavLink
                    to="edit"
                    className={({ isActive }) =>
                        `p-4 w-1/3 h-full text-center font-bold text-xl  capitalize ${
                            isActive ? "text-primary" : "text-dark bg-secondary-shade"
                        }`
                    }
                >
                    {t("common:edit")}
                </NavLink>
                <div className="bg-secondary-shade h-full flex justify-center items-center">
                    <div className="w-0.5 h-8 bg-dark-tint"></div>
                </div>
                <NavLink
                    to="translation"
                    className={({ isActive }) =>
                        `p-4 w-1/3 h-full text-center font-bold text-xl  capitalize ${
                            isActive ? "text-primary" : "text-dark bg-secondary-shade"
                        }`
                    }
                >
                    {t("common:translation")}
                </NavLink>
            </div>
            <div className="bg-secondary-shade">
                <div className="container sm:mx-auto ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default FormDetails;
