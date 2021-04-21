import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, otpAccount, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      otpAccount.isSent === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  otpAccount: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  otpAccount: state.otpAccount
});

export default connect(mapStateToProps)(PrivateRoute);
