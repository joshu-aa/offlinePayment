import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DateRange from "react-date-range/dist/components/DateRange";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateModal = (props) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const submit = () => {
    let epochStartDate = new Date(state[0].startDate).getTime() / 1000;
    let epochEndDate = new Date(state[0].endDate).getTime() / 1000;
    props.dateRange(epochStartDate, epochEndDate);
  };

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={props.hide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dateModal text-center">
          <DateRange
            fixedHeight={true}
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => submit()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DateModal;
