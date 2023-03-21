import { Fragment, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { loadUser, logout } from "./actions/auth.actions";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import FormDetails from "./pages/FormDetails";
import FormAnswers from "./pages/FormDetails/FormAnswers";
import FormEdit from "./pages/FormDetails/FormEdit";
import FormTranslation from "./pages/FormDetails/FormTranslation";
import FormPreview from "./pages/FormPreview";
import Forms from "./pages/Forms";
import RequiredAuth from "./routes/RequiredAuth";
import Spinner from "./shared/components/Spinner";
import { useAppDispatch, history } from "./store";
import { setAuthToken } from "./utils";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import FormTranslationEdit from "./pages/FormDetails/FormTranslation/FormTranslationEdit/index";
import SubmissionSuccess from "./pages/SubmissionSuccess/index";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        // check for token in LS
        if (localStorage.token) {
            // if there is a token set axios headers for all requests
            setAuthToken(localStorage.token);
        }
        dispatch(loadUser());
        // log user out from all tabs if they log out in one tab
        window.addEventListener("storage", () => {
            if (!localStorage.token) {
                dispatch(logout());
            }
        });
    }, []);

    return (
        <Fragment>
            <Suspense fallback={<Spinner />}>
                <Router history={history}>
                    <Routes>
                        <Route path="/" element={<RequiredAuth />}>
                            <Route path="" element={<Dashboard />}>
                                <Route path="" element={<Navigate to={"/forms"} />} />
                                <Route path="forms" element={<Forms />} />
                                <Route path="forms/:formId" element={<FormDetails />}>
                                    <Route path="answers" element={<FormAnswers />} />
                                    <Route path="edit" element={<FormEdit />} />
                                    <Route path="translation" element={<FormTranslation />} />
                                    <Route path="translation/:transLanguage" element={<FormTranslationEdit />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/form/s/:formId" element={<FormPreview />} />
                        <Route path="/form/s/:formId/success" element={<SubmissionSuccess />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </Suspense>
        </Fragment>
    );
}

export default App;
