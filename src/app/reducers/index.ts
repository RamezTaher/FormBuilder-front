import { AnyAction, combineReducers, Reducer } from "redux";
import { RouterState } from "redux-first-history";
import authReducers from "./auth.reducers";
import formReducers from "./form.reducers";
import submissionReducers from "./submission.reducers";
const createRootReducer = (routerReducer: Reducer<RouterState, AnyAction>) =>
    combineReducers({
        router: routerReducer,
        auth: authReducers,
        form: formReducers,
        submission: submissionReducers,
    });
export default createRootReducer;
