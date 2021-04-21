import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import TransferLoadModal from "../layout/TransferLoadModal";
import api from "../service/api";

const TransaferLoadContainer = ({ isLoading, setIsLoading, handleDisable }) => {
  const [formData, setFormData] = useState({
    account: "",
    amount: "",
  });

  const { account, amount } = formData;

  const onChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const token = localStorage.getItem("token");

  const onSubmit = async (handleClose) => {
    handleDisable(true);
    await api.otc
      .loadTransaction(
        {
          account,
          amount,
        },
        token
      )
      .then((res) => {
        alert("Transaction completed");
        handleDisable(false);
        handleClose();
      })
      .catch((err) => {
        if (err.response.data.error === "Session expired. Please re-login") {
          alert("Session expired. Please re-login");
        } else {
          alert(err.response.data.error);
          handleDisable(false);
          handleClose();
        }
      });
  };

  return (
    <Fragment>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th colSpan="2">
              <span>Load Wallet</span>
            </th>
          </tr>
        </thead>
      </table>
      <div className="center inner">
        <form className="form">
          <div className="form-group">
            <label htmlFor="account">
              <strong>Subscriber ID or Mobile Number</strong>
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="eg. 1000123456 or 0915123456"
              name="account"
              value={account}
              onChange={(e) => onChange(e)}
              required
              id="account"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">
              <strong>Amount</strong>
            </label>
            <input
              className="form-control form-control"
              type="text"
              min="1"
              step="1"
              placeholder="eg. 50"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <TransferLoadModal
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            submit={onSubmit}
            account={account}
            amount={amount}
          />
        </form>
      </div>
    </Fragment>
  );
};

TransaferLoadContainer.propTypes = {};

export default TransaferLoadContainer;
