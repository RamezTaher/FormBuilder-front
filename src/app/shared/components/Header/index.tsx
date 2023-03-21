import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store";
import { IUser } from "../../../@types/user";

type Props = {};

const Header = (props: Props) => {
    const { data } = useAppSelector(state => state.auth);
    return (
        <header className="bg-primary">
            <nav className=" flex justify-between items-center py-4 px-6 container sm:mx-auto ">
                <Link to="/forms" className="font-bold text-dark-shade">Forms</Link>
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-full"></div>
                    <div>{(data as IUser)?.firstName}</div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
