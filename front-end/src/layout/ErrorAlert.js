import React, { useState, useEffect } from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  const [displayError, setDisplayError] = useState("hide");

  useEffect(() => {
    if (error) {
      setDisplayError("show");
    } else {
      setDisplayError("hide");
    }
  }, [error]);

  const handleDisplayError = () => {
    setDisplayError("hide");
  };

  // Modified Bootstrap Alert componenet to have a close button 'x'
  return error ? (
    <div
      className={`alert alert-danger my-3 alert-dismissible shadow fade ${displayError}`}
      role="alert"
    >
      <span className="font-weight-bold"> Error:</span> {error.message}
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={handleDisplayError}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  ) : (
    <div
      className={`alert alert-danger my-3 alert-dismissible fade ${displayError}`}
      role="alert"
    ></div>
  );
}

export default ErrorAlert;
