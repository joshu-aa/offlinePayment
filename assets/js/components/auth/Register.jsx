import React, { Fragment, useState } from "react";
import Link from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    otcName: "",
    role: "",
    password: "",
    password2: "",
  });

  const {
    firstName,
    lastName,
    contactNumber,
    email,
    otcName,
    role,
    password,
    password2,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("passwords does not match");
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <div className="outer">
        {/* <Alert /> */}
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
                  <label htmlFor="otcName">
                    <strong>Otc Name</strong>
                  </label>
                  <select
                    className="form-control"
                    value={otcName}
                    name="otcName"
                    onChange={(e) => onChange(e)}>
                    <option value="" disabled selected>
                      Select one
                    </option>
                    {/* {locationOptions()} */}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="role">
                    <strong>Role</strong>
                  </label>
                  <select
                    className="form-control"
                    value={role}
                    name="role"
                    onChange={(e) => onChange(e)}>
                    <option value="" disabled selected>
                      Select one
                    </option>
                    {/* {locationOptions()} */}
                  </select>
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

export default Register;
