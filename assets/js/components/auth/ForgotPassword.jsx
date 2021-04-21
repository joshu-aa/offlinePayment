import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import  api  from "../service/api";
import SubmitButton from "./../layout/SubmitButton";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import Logo from "../../../img/Woofy.png";

const ForgotPassword = ({ setAlert, isAuthenticated, account, location }) => {
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const { password, password2 } = formData;

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      setIsLoading(true);
      const body = JSON.stringify({
        account,
        password
      });
      api.accounts.forgotPassword(body).then(
        (res) => {
          if (res.data.success) {
            alert(res.data.success);
            window.location.reload();
            setIsLoading(false);
        }
        },
        (error) => {
          alert(error.response.data.error);
          setIsLoading(false);
        }
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  // Redirect to login page if url is manually changed
  if (!location.state) {
    return <Redirect to="/login" />;
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
                <i className="fas fa-user"></i> Change your password
              </p>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="password">
                    <strong>Password</strong>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                    id="password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">
                    <strong>Confirm Password</strong>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    id="password2"
                    onChange={(e) => onChange(e)}
                    minLength="6"
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
                Go back to login page <Link to="/login">Click here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  account: state.otpAccount.otp.account,
});

export default connect(mapStateToProps, { setAlert })(ForgotPassword);
