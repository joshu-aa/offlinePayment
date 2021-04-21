import React, { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import api from "../service/api";

const TransferLoadModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [subscriberData, setSubscriberData] = useState({});
  const [isError, setIsError] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const { account, isLoading, setIsLoading, amount } = props;

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVerifiedData = async () => {
      try {
        setIsLoading(true);
        setIsRequesting(true);
        const result = await api.accounts.verifySubscriber({ account }, token);
        if (result.data.hasOwnProperty("code")) {
          setIsError(true);
          setIsLoading(true);
          setSubscriberData("Session expired. Please re-login. Thank you.");
        } else if (result.data.hasOwnProperty("subscriberId")) {
          setIsError(false);
          setIsLoading(false);
          setSubscriberData(result.data);
        } else if (result.data.hasOwnProperty("error")) {
          setIsError(true);
          setIsLoading(true);
          setSubscriberData(result.data.error);
        } else if (result.data.hasOwnProperty("isSuccess")) {
          setIsError(true);
          setIsLoading(false);
          setSubscriberData("Loading ...");
        }
        setIsRequesting(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(true);
        if (!token) {
          setSubscriberData("Token expired. Please re-login");
        } else {
          setSubscriberData("System Error. Try again later");
        }
        setIsRequesting(false);
      }
    };

    fetchVerifiedData();
  }, [modalShow]);

  return (
    <Fragment>
      <Button
        className="form-control"
        variant="success"
        disabled={!account || !amount}
        onClick={handleShow}>
        Submit
      </Button>

      <Modal
        show={modalShow}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Account Verification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRequesting ? (
            <h5> Loading ... </h5>
          ) : isError ? (
            <h5> {subscriberData} </h5>
          ) : (
            <div>
              <h5>Transfer ₱{amount} to: </h5> <br></br>
              <h6>Subscriber ID: {subscriberData.subscriberId}</h6>
              <h6>Fullname: {subscriberData.fullName}</h6>
              <h6>Unit number: {subscriberData.unitNumber}</h6>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => props.submit(handleClose)}
            disabled={isLoading}>
            {isLoading ? (
              <Fragment>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Confirm
              </Fragment>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default TransferLoadModal;
