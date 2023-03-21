import { AnyAction, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from "./reducers";

import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});
const initialState = {};
const middleware = [thunk, routerMiddleware, createLogger()];

export const store = createStore(
    createRootReducer(routerReducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export const history = createReduxHistory(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
//To reduce repetition, use that type whenever you write a thunk
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
// Use throughout your app instead of plain `useDispatch`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Use throughout your app instead of plain `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
