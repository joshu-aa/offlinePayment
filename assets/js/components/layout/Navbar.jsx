import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Dropdown from "react-bootstrap/Dropdown";
import Navlogo from "../../../img/WoofyNav.jpg";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <Dropdown alignRight>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {user ? user.firstName : ""}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/settings">
          Settings
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#" onClick={logout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <nav className="navbar">
      <Link to="/home">
        <img src={Navlogo} alt="Woofy Yellow" style={{ width: "8rem" }} />
      </Link>
      {!loading && <Fragment>{isAuthenticated ? authLinks : null}</Fragment>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
