import React from "react";

const SubmitButton = ({ isLoading, name, handleClick, type }) => {
  return (
    <button
      className={`${type ? "" : "form-control"} btn btn-${
        type ? type : "primary"
      }`}
      id="submit"
      disabled={isLoading}
      onClick={(e) => handleClick(e)}>
      {isLoading ? (
        <React.Fragment>
          <spans
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"></spans>{" "}
          {name}
        </React.Fragment>
      ) : (
        name
      )}
    </button>
  );
};

export default SubmitButton;
