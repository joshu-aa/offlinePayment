import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/login.css";
import "./styles/css/all.min.css";
import "./styles/css/accountStatus.css";

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Router, Switch } from 'react-router-dom';

import Login from './js/components/auth/Login';
import Register from './js/components/auth/Register';

//redux
import { Provider } from 'react-redux';
import store from './js/store';
function App ()
 {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment> 
                <section className = "container">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </section>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}
 
ReactDOM.render(<App/>, document.getElementById("root"));