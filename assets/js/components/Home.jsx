import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Alert from "../components/layout/Alert";
import { loadUser } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TransaferLoadContainer from "./contents/TransaferLoadContainer";
import TransactionContainer from "./contents/TransactionContainer";
import RecentActivities from "./contents/recentActivities";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser();
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleDisable = (bool) => {
    setIsLoading(bool);
  };

  return (
    <Fragment>
      <Navbar />
      <Alert />
      <div className="container">
        <div className="col">
          <h3>
            <i className="fas fa-home" /> Home
          </h3>
          <div>
            <TransaferLoadContainer
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleDisable={handleDisable}
            />
            <RecentActivities />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Home);
