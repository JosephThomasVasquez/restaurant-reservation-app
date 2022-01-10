import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
      <h1>Dashboard</h1>
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
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
