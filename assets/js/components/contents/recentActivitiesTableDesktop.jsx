import React from "react";

const RecentActivitiesTableDesktop = ({ records, onSort, sort }) => {
  const raiseSort = (path) => {
    const sortColumn = { ...sort };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  const renderSortIcon = (path) => {
    if (path !== sort.path) return null;
    if (sort.order === "asc") return <i className="fas fa-sort-up" />;
    return <i className="fas fa-sort-down"></i>;
  };

  return (
    <table className="table center fixedTable">
      <thead>
        <tr>
          <th className="clickable" onClick={() => raiseSort("timestamp")}>
            Date {renderSortIcon("timestamp")}
          </th>
          <th>Subscriber ID</th>
          <th>Subscriber Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.timestamp}</td>
            <td>{record.subscriberId}</td>
            <td>{record.identifier}</td>
            <td>{record.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentActivitiesTableDesktop;
