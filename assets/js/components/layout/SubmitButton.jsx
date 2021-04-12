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
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"></span>{" "}
          {name}
        </React.Fragment>
      ) : (
        name
      )}
    </button>
  );
};

export default SubmitButton;
