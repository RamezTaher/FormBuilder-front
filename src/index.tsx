import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./config/i18n";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
