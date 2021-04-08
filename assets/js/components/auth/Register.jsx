import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    companyName: "",
    password: "",
    password2: "",
  });

  const {
    firstName,
    lastName,
    contactNumber,
    email,
    companyName,
    password,
    password2,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords does not match", "danger");
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <div className="outer">
        <Alert />
        <div className="middle">
          <div className="inner">
            <div className="text-center">
              <h2 className="large woofyRed">Sign Up</h2>
              <p className="lead">
                <i className="fas fa-user"></i> Create Account
              </p>

              <form
                className="form"
                onSubmit={(e) => onSubmit(e)}
                autoComplete="false">
                <div className="form-group">
                  <label htmlFor="contactNumber">
                    <strong>Contact Number</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="09123456789"
                    name="contactNumber"
                    value={contactNumber}
                    id="contactNumber"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <strong>E-mail</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="juan@gmail.com"
                    name="email"
                    value={email}
                    id="email"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">
                    <strong>First Name</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    id="firstName"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">
                    <strong>Last Name</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    id="lastName"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="companyName">
                    <strong>Company Name</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Company Name"
                    name="companyName"
                    value={companyName}
                    id="companyName"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>

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
                    id="password"
                    onChange={(e) => onChange(e)}
                    minLength="6"
                    autoComplete="new-password"
                    required
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
                    required
                  />
                </div>
                {/* <SubmitButton
                  isLoading={isLoading}
                  name={"Register"}
                  handleClick={onSubmit}
                /> */}
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Register"></input>
              </form>

              <p />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
