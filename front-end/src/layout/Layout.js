import React from "react";
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
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <ErrorAlert
            error={{
              message:
                "This will display an error response back from the server or front end",
            }}
          />
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
