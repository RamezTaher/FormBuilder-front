import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../../actions/auth.actions";
import { useAppDispatch, useAppSelector } from "../../../store";

interface navigationState {
    from: Location;
}
export default function Login() {
    const { t } = useTranslation(["auth"]);
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const onChangeInput = (e: FormEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
    };
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login(form));
        navigate((location.state as navigationState)?.from?.pathname || "/forms", { replace: true });
    };

    if (isAuthenticated) {
        return <Navigate to={(location.state as navigationState)?.from?.pathname || "/forms"} replace />;
    }
    return (
        <>
            <div className="h-screen flex">
                <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                {t("auth:sign-in-to-account")}
                            </h2>
                        </div>
                        <div className="mt-6">
                            <form onSubmit={e => onSubmit(e)} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className=""
                                            value={form.email}
                                            onChange={e => onChangeInput(e)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className=""
                                            value={form.password}
                                            onChange={e => onChangeInput(e)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 outline-none text-primary border-dark ring-0 checked:border-primary"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link to="#" className="font-medium text-primary hover:underline">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-primary">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
}
