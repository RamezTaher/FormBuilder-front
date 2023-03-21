import Header from "../../shared/components/Header";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
type Props = {};

const Dashboard = (props: Props) => {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    );
};

export default Dashboard;
