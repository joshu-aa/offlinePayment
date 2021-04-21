import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { otpVerify } from "../../actions/auth";
import { otpAccountRegister } from "../../actions/auth";
import SubmitButton from "./../layout/SubmitButton";
import Alert from "../layout/Alert";
import Logo from "../../../img/Woofy.png";

const Otp = ({
  location,
  otpAccount,
  otpVerify,
  isVerified,
  auth,
  otpAccountRegister,
}) => {
  const [OTP, setOTP] = useState({
    code: "",
  });

  const { code } = OTP;

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setOTP({ ...OTP, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await otpVerify(code, otpAccount.otp.account).then((res) => {
      if (res) {
        setIsLoading(false);
      }
    });
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const contactNumber = otpAccount.otp.account;
    const resendType = type === "5" ? "1" : type;
    const firstName = auth.user ? auth.user.firstName : null;
    await otpAccountRegister(contactNumber, resendType, firstName).then(
      (res) => {
        if (res === "resend" || res === true) {
          setIsLoading(false);
        }
      }
    );
  };

  if (location.state) {
    let type = location.state.type;
    if (!auth.isAuthenticated && type !== "5" && type !== "2" && type !== "1") {
      return <Redirect to="/login" />;
    }
  } else {
    return <Redirect to="/" />;
  }

  const type = location.state.type;
  if (isVerified && type === "1") {
    return (
      <Redirect
        to={{ pathname: "/register_mobile", state: { status: true } }}
      />
    );
  } else if (isVerified && type === "5") {
    return (
      <Redirect to={{ pathname: "/register_email", state: { status: true } }} />
    );
  } else if (isVerified && type === "2") {
    return (
      <Redirect
        to={{ pathname: "/forgot_password", state: { status: true } }}
      />
    );
  } else if (isVerified && type === "3") {
    return <Redirect to="/change_contact_number" />;
  } else if (isVerified && type === "4") {
    return <Redirect to="/change_email" />;
  } else if (isVerified && type === "6") {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="outer">
        <Alert />
        <div className="middle">
          <div className="inner">
            <div className="text-center">
              <img src={Logo} alt="Woofy" className="woofy" />
              <h2 className="large woofyRed">
                {type === "1" || type === "5"
                  ? "Sign Up"
                  : type === "2"
                  ? "Forgot Password"
                  : type === "3"
                  ? "Change Contact Number"
                  : "Sign Up"}
              </h2>
              <p className="lead">
                <i className="fas fa-user"></i> Enter verification code
              </p>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="code">
                    <strong>Code</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="code"
                    value={code}
                    id="code"
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
                Please wait up to 5 minutes before resending verification code{" "}
                <SubmitButton
                  isLoading={isLoading}
                  name={"Resend code"}
                  handleClick={handleResend}
                  type={"link"}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  otpAccount: state.otpAccount,
  isVerified: state.otp.isVerified,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  otpVerify,
  otpAccountRegister,
})(Otp);
