import React, { ReactElement } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../shared/components/Spinner";
import { useAppSelector } from "../store";
import { useEffect } from "react";
const RequiredAuth = (): ReactElement => {
    const { isLoading, isAuthenticated, isError, isSuccess } = useAppSelector(state => state.auth);
    const location = useLocation();
    if (isError && !isLoading && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isSuccess && !isLoading && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // if (isError && !isAuthenticated) {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }
    if (isSuccess && isAuthenticated) {
        return <Outlet />;
    }
    return <Spinner />;
};

export default RequiredAuth;
