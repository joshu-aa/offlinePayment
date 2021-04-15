import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../img/Woofy.png";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import { Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    type: "password",
  });

  const { username, password, type } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    login(username, password);
  };

  const togglePassword = (e) => {
    setFormData({
      ...formData,
      type: type === "password" ? "text" : "password",
    });
  };

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
              <p className="lead" style={{ margin: "0.5em 0 0.5em 0" }}>
                Sign in to your account
              </p>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="username">
                    <strong>Mobile Number, Email or Subscriber ID</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="09123456789"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <strong>
                      Password{" "}
                      <i
                        onClick={togglePassword}
                        className={
                          type === "password"
                            ? "fas fa-eye clickable"
                            : "fas fa-eye-slash clickable"
                        }
                      />
                    </strong>
                  </label>
                  <input
                    className="form-control"
                    type={type}
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="submit" />
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"></input>
                </div>
              </form>
              {/* <div>
                <p className="my-1">
                  <Link
                    to={{
                      pathname: "/forgot_password_account",
                      state: { type: "2" },
                    }}>
                    Forgot Password?
                  </Link>{" "}
                </p>
              </div> */}
              <div>
                <p>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
              </div>
              <div>
                <p>
                  <a target="_blank" href="https://woofy.ph/faq-procedure">
                    FAQs and Procedures
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
