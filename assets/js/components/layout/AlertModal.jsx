import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const AutoRenewModal = (props) => {
  const [modalShow, setModalShow] = useState(props.show);
  const [isLoading, setIsLoading] = useState(false);

  const [isCheck, setIsCheck] = useState(false);

  const handleCheckbox = () => {
    setIsCheck(!isCheck);
  };

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enable Auto Renew
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="flexCheckDefault"
              checked={isCheck}
              onChange={handleCheckbox}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Your application is now pending for approval.
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer id="spaceBetween">
          <Button disabled={!isCheck} onClick={() => props.onToggle()}>
            {props.isLoading ? (
              <React.Fragment>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Done
              </React.Fragment>
            ) : (
              "Done"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AutoRenewModal;
