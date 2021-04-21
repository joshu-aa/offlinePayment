// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/login.css";
import "./styles/css/all.min.css";
import "./styles/css/accountStatus.css";
import "./styles/app.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "react-datepicker/dist/react-datepicker.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import React, { Fragment, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import PrivateRoute from "./js/components/routing/PrivateRoute";
import OtpPrivateRoute from "./js/components/routing/OtpPrivateRoute";
import Woofy from "../assets/img/gif/woofy.gif";

const Login = lazy(() => import("./js/components/auth/Login"));
const Register = lazy(() => import("./js/components/auth/Register"));
const Home = lazy(() => import("./js/components/Home"));
const Otp = lazy(() => import("./js/components/auth/Otp"));
const ForgotPasswordAccount = lazy(() =>
  import("./js/components/auth/ForgotPasswordAccount")
);
const ForgotPassword = lazy(() =>
  import("./js/components/auth/ForgotPassword")
);

//redux
import { Provider } from "react-redux";
import store from "./js/store";
import { loadUser } from "./js/actions/auth";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <Suspense
      fallback={
        <div className="outer">
          <div className="middle">
            <div className="inner">
              <div className="text-center">
                <img src={Woofy} alt="loading..." />
                <div>
                  <strong>Loading...</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Route exact path="/" component={Login} />
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />{" "}
              <Route
                exact
                path="/forgot_password_account"
                component={ForgotPasswordAccount}
              />
              <OtpPrivateRoute exact path="/otp" component={Otp} />
              <OtpPrivateRoute
                exact
                path="/forgot_password"
                component={ForgotPassword}
              />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
