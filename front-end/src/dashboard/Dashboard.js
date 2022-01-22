import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import TablesList from "../tables/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, errorHandler }) {
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handleDateChange = ({ target }) => {
    switch (target.name) {
      case "previous":
        history.push(`/dashboard?date=${previous(date)}`);
        break;
      case "today":
        history.push(`/dashboard?date=${today()}`);
        break;
      case "next":
        history.push(`/dashboard?date=${next(date)}`);
        break;
      default:
        history.push(`/dashboard?date=${today()}`);
        break;
    }
  };

  return (
    <main>
      <h1 className="d-inline-block">Dashboard</h1>
      {reservations.length >= 1 ? (
        <span className="mx-3">
          <span className="reservation-count">{reservations.length}</span>
          &nbsp;reservations
        </span>
      ) : null}

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="row">
        <div className="col-1 pr-0">
          <button
            name="previous"
            className="btn btn-secondary btn-sm btn-block"
            onClick={handleDateChange}
          >
            Previous
          </button>
        </div>

        <div className="col-1 pr-0">
          <button
            name="today"
            className="btn btn-secondary btn-sm btn-block"
            onClick={handleDateChange}
          >
            Today
          </button>
        </div>

        <div className="col-1 pr-0">
          <button
            name="next"
            className="btn btn-secondary btn-sm btn-block"
            onClick={handleDateChange}
          >
            Next
          </button>
        </div>
      </div>
      <div className="container-fluid m-0 p-0">
        <div className="row">
          <div className="col-9 m-0 p-0">
            <ReservationList reservations={reservations} />
          </div>
          <div className="col-3 m-0 p-0 pr-3">
            <TablesList tables={tables} errorHandler={errorHandler} />
          </div>
        </div>
      </div>
      <ErrorAlert error={(reservationsError, tablesError)} />
    </main>
  );
}

export default Dashboard;
