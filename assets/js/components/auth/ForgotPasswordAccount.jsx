import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { otpAccountRegister } from "../../actions/auth";
import SubmitButton from "./../layout/SubmitButton";
import Alert from "../layout/Alert";
import PropTypes from "prop-types";
import Logo from "../../../img/Woofy.png";

const ForgotPasswordAccount = ({
  otpAccountRegister,
  otp,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    account: "",
  });

  const { account } = formData;

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    otpAccountRegister(account, "2", null).then((res) => {
      if (res === true) {
        setIsLoading(false);
      }
    });
  };

  if (otp) {
    return (
      <Redirect
        to={{
          pathname: "/otp",
          state: {
            type: "2",
          },
        }}
      />
    );
  }

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Fragment>
      <div className="outer">
        <Alert />
        <div className="middle">
          <div className="inner">
            <div className="text-center">
              <img src={Logo} alt="Woofy" className="woofy" />
              <h2 className="large woofyRed">Forgot Password</h2>
              <p className="lead">
                <i className="fas fa-user"></i> Enter your email address or
                mobile number
              </p>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="account">
                    <strong>Email Address or Mobile Number</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="account"
                    value={account}
                    id="account"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <label htmlFor="submit" />
                <SubmitButton
                  isLoading={isLoading}
                  name={"Submit"}
                  handleClick={onSubmit}
                />
              </form>
              <p className="my-1">
                Go back to sign in page?
                <Link to="/login"> Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ForgotPasswordAccount.propTypes = {
  otpAccountRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  otp: state.otpAccount.otp,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { otpAccountRegister })(
  ForgotPasswordAccount
);
