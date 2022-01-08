import React, { useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import ErrorAlert from "./ErrorAlert";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const [errors, setErrors] = useState(null);

  const errorHandler = (foundErrors) => {
    if (foundErrors) {
      setErrors(foundErrors);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <ErrorAlert error={errors} />
          <Routes errorHandler={errorHandler} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
