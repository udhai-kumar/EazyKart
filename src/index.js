import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import store from './redux/store'
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter basename="/">
    <Provider store={store}>
    <ToastContainer
position="top-right"
theme="dark"
autoClose={2000}
closeOnClick
pauseOnHover={false}
/>
    <App />
    </Provider>
    </HashRouter>
  </React.StrictMode>
);
