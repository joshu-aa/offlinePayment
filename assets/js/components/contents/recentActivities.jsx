import React, { Component } from "react";
import Select from "react-select";
// import $ from "jquery";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import _ from "lodash";
import { CSVLink } from "react-csv";

import RecentActivitiesTableDesktop from "./recentActivitiesTableDesktop";
import DateModal from "./../layout/DateModal";
import api from "../service/api";
import { Pagination } from "../layout/pagination";
import { styles, styles2, styles3 } from "./../layout/reactSelectStyles";

const now = new Date();
const secondsSinceEpoch = Math.round(now.getTime() / 1000);

const options = [
  { value: "7d", label: "7 days" },
  { value: "1m", label: "1 month" },
  { value: "3m", label: "3 months" },
  { value: "custom", label: "Custom" },
];

const show = [
  { value: "10", label: "10 entries" },
  { value: "25", label: "25 entries" },
  { value: "50", label: "50 entries" },
];

const headers = [
  { label: "Agent ID", key: "agentId" },
  { label: "Subscriber ID", key: "subscriberId" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Identifier", key: "identifier" },
  { label: "Transaction ID", key: "transactionId" },
  { label: "Otc Name", key: "otcName" },
  { label: "Time Stamp", key: "timestamp" },
];

class RecentActivities extends Component {
  state = {
    selectedOption: [],
    selectedShow: [],
    startDate: [],
    endDate: [],
    records: [],
    modalShow: false,
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "timestamp", order: "desc" },
    fileName: new Date().toISOString().slice(0, 10) + ".csv",
  };

  async componentDidUpdate(prevProps, prevState) {
    const jwt = localStorage.getItem("token");
    if (
      this.state.startDate !== prevState.startDate ||
      this.state.endDate !== prevState.endDate
    ) {
      const start = new Date(this.state.startDate * 1000)
        .toISOString()
        .slice(0, 10);
      const end = new Date(this.state.endDate * 1000)
        .toISOString()
        .slice(0, 10);
      const startDate = this.state.startDate;
      const endDate = this.state.endDate;
      return api.otc
        .getAgentTransaction(jwt, { startDate, endDate })
        .then((res) => {
          const records = res.data;
          this.setState({
            records,
            currentPage: 1,
            fileName: start + " " + "-" + " " + end + ".csv",
          });
        });
    }
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    await api.otc.getAgentDefaultTransaction(token).then((res) => {
      const records = res.data;
      this.setState({ records });
    });
  }

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  handleDateRange = (startDate, endDate) => {
    this.setState({ startDate, endDate, modalShow: false });
  };

  //for date
  handleChange = (selectedOption) => {
    this.setState({ endDate: secondsSinceEpoch, selectedOption });
    if (selectedOption.value === "7d") {
      let startDate = secondsSinceEpoch - 604800;
      this.setState({ startDate });
    } else if (selectedOption.value === "1m") {
      let startDate = secondsSinceEpoch - 2592000;
      this.setState({ startDate });
    } else if (selectedOption.value === "3m") {
      let startDate = secondsSinceEpoch - 7776000;
      this.setState({ startDate });
    } else if (selectedOption.value === "custom") {
      this.setState({ modalShow: true });
    }
  };

  //for show data #
  handleShow = (selectedShow) => {
    this.setState({ selectedShow });
    if (selectedShow.value === "10") {
      this.setState({ pageSize: 10 });
    } else if (selectedShow.value === "25") {
      this.setState({ pageSize: 25 });
    } else if (selectedShow.value === "50") {
      this.setState({ pageSize: 50 });
    }
  };

  //for paginate
  handlePaginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  //for sorting
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      currentPage,
      pageSize,
      sortColumn,
      modalShow,
      fileName,
    } = this.state;
    const sorted = _.orderBy(
      this.state.records,
      [sortColumn.path],
      [sortColumn.order]
    );
    const indexOfLast = this.state.currentPage * this.state.pageSize;
    const indexOfFirst = indexOfLast - this.state.pageSize;
    const records = sorted.slice(indexOfFirst, indexOfLast);
    const selectedOption = this.state.selectedOption;
    const csvData = this.state.records.map(
      ({ id, action, source, vatSales, vatAmount, ...keep }) => keep
    );
    return (
      <React.Fragment>
        <MediaQuery query="(min-width: 768px)">
          <div>
            <h3>Recent Transactions</h3>
          </div>
          <div style={{ marginBottom: "2.5em" }}>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              classNamePrefix="react-select"
              styles={styles2}
            />
            <DateModal
              show={modalShow}
              hide={this.handleClose}
              dateRange={this.handleDateRange}
            />
            {this.state.records.length > 5 && (
              <Select
                onChange={this.handleShow}
                options={show}
                defaultValue={{ value: "10", label: "10 entries" }}
                classNamePrefix="react-select"
                styles={styles3}
              />
            )}{" "}
            <CSVLink
              className="float-right"
              data={csvData}
              headers={headers}
              filename={fileName}>
              Export
            </CSVLink>
          </div>
          <RecentActivitiesTableDesktop
            records={records}
            onSort={this.handleSort}
            sort={sortColumn}
          />
          {this.state.records.length > 5 && (
            <Pagination
              pageSize={pageSize}
              total={this.state.records.length}
              paginate={this.handlePaginate}
              currentPage={currentPage}
            />
          )}{" "}
        </MediaQuery>
        {/* mobile view */}
        <MediaQuery query="(max-width: 767px)">
          <React.Fragment>
            <CSVLink data={csvData} headers={headers} filename={fileName}>
              Export
            </CSVLink>
            <table className="recentTrans table">
              <thead>
                <tr>
                  <th colSpan="2">
                    <div>
                      Recent Transactions{" "}
                      <DateModal
                        show={modalShow}
                        hide={this.handleClose}
                        dateRange={this.handleDateRange}
                      />
                      <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        classNamePrefix="react-select"
                        styles={styles}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {this.state.records.map((record) => (
                  <tr key={record.id} style={{ verticalAlign: "middle" }}>
                    <td>
                      <div>{record.subscriberId}</div>
                      <div>{record.timestamp}</div>
                    </td>
                    <td style={{ width: "40%" }}>
                      <div>{record.amount}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        </MediaQuery>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(RecentActivities);
