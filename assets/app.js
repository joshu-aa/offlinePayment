import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/login.css";
import "./styles/css/all.min.css";
import "./styles/css/accountStatus.css";
import "./styles/app.css"

import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import PrivateRoute from "./js/components/routing/PrivateRoute";

import Login from './js/components/auth/Login';
import Register from './js/components/auth/Register';
import Home from './js/components/Home';

//redux
import { Provider } from 'react-redux';
import store from './js/store';
import { loadUser } from "./js/actions/auth";

function App ()
 {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          store.dispatch(loadUser())
        }
    },[]);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment> 
                    <Route exact path="/" component={Login} />  
                    <Switch>
                        <PrivateRoute exact path="/home" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} /> 
                    </Switch>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}
 
ReactDOM.render(<App/>, document.getElementById("root"));