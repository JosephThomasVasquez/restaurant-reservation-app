import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";

const ReservationCard = ({ reservation }) => {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
  } = reservation;

  return (
    <div className="card col-3 shadow m-3 p-0 reservation-card">
      <h5 className="card-header font-weight-bold">
        {first_name} {last_name}
      </h5>
      <div className="card-body">
        <div className="card-title">Phone: {mobile_number}</div>
        <p className="card-text">Time: {reservation_time}</p>
        <p className="card-text">Guests: {people}</p>
      </div>
      <div className="row mx-1 my-3">
        <div className="col">
          <Link
            className="seat-link btn btn-secondary"
            to={{
              pathname: `/reservations/${reservation_id}/seat`,
              state: { reservation },
            }}
            id="reservation-id"
          >
            <i className="fas fa-chair"></i>
            &nbsp;Seat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ReservationCard);
