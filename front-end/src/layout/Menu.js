import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const [activeLink, setActiveLink] = useState("dashboard");

  // Set state for active link for the route theuser is currently one
  const handleActiveLink = ({ target }) => {
    if (!target.id && target.innerText === "Periodic Tables") {
      // console.log(target.id);
      return setActiveLink("dashboard");
    }
    setActiveLink(target.id);
  };

  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3" onClick={handleActiveLink}>
            <span className="brand" name="dashboard">
              Periodic Tables
            </span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item col-12">
            <Link
              className={
                activeLink === "dashboard"
                  ? "nav-link slide-out active"
                  : "nav-link slide-out"
              }
              to="/dashboard"
              onClick={handleActiveLink}
              id="dashboard"
            >
              <span className="oi oi-dashboard ml-2" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item col-12">
            <Link
              className={
                activeLink === "search"
                  ? "nav-link slide-out active"
                  : "nav-link slide-out"
              }
              to="/search"
              onClick={handleActiveLink}
              id="search"
            >
              <span className="oi oi-magnifying-glass ml-2" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item col-12">
            <Link
              className={
                activeLink === "reservations/new"
                  ? "nav-link slide-out active"
                  : "nav-link slide-out"
              }
              to="/reservations/new"
              onClick={handleActiveLink}
              id="reservations/new"
            >
              <span className="oi oi-plus ml-2" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item col-12">
            <Link
              className={
                activeLink === "tables/new"
                  ? "nav-link slide-out active"
                  : "nav-link slide-out"
              }
              to="/tables/new"
              onClick={handleActiveLink}
              id="tables/new"
            >
              <span className="oi oi-layers ml-2" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
