import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import api from "../service/api";

const TransactionContainer = (props) => {
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));
  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Position",
        field: "position",
        sort: "asc",
        width: 270,
      },
      {
        label: "Office",
        field: "office",
        sort: "asc",
        width: 200,
      },
      {
        label: "Age",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Start date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Salary",
        field: "salary",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        name: "Tiger Nixon",
        position: "System Architect",
        office: "Edinburgh",
        age: "61",
        date: "2011/04/25",
        salary: "$320",
      },
      {
        name: "Garrett Winters",
        position: "Accountant",
        office: "Tokyo",
        age: "63",
        date: "2011/07/25",
        salary: "$170",
      },
      {
        name: "Ashton Cox",
        position: "Junior Technical Author",
        office: "San Francisco",
        age: "66",
        date: "2009/01/12",
        salary: "$86",
      },
    ],
  };

  return (
    <Fragment>
      <div className="transaction">
        <div className="date">
          <div className="dateChild">
            <label>Start date: </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="dateChild">
            <label>End date: </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>
        <div>
          <MDBTable responsive>
            <MDBTableHead columns={data.columns} />
            <MDBTableBody rows={data.rows} />
          </MDBTable>
        </div>
      </div>
    </Fragment>
  );
};

TransactionContainer.propTypes = {};

export default TransactionContainer;
