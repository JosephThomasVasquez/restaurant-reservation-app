import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { updateStatus } from "../utils/api";

const ReservationCard = ({ reservation }) => {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    people,
    status,
    reservation_time,
  } = reservation;

  return (
    <div className="card col-3 shadow m-3 p-0 reservation-card">
      <h5 className="card-header font-weight-bold">
        {first_name} {last_name}
      </h5>
      <div className="card-body">
        <div className="row">
          <div className="col-4">Phone:</div>
          <span className="col-7">{mobile_number}</span>
        </div>
        <div className="row">
          <div className="col-4">Time: </div>
          <span className="col-7">{reservation_time}</span>
        </div>
        <div className="row">
          <div className="col-4">Guests:</div>
          <span className="col-7">{people}</span>
        </div>
        <div className="row">
          <div className="col-4">Status:</div>
          <span
            className="col-7 res-status"
            data-reservation-id-status={reservation.reservation_id}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="row mx-1 my-3">
        <div className="col">
          {status !== "seated" ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ReservationCard);
