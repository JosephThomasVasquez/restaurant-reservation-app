import React from "react";

const ReservationCard = ({ reservation }) => {
  console.log(reservation);

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
    <div className="card col-3 shadow-lg m-3 reservation-card">
      <h5 className="card-header font-weight-bold">
        {first_name} {last_name}
      </h5>
      <div className="card-body">
        <div className="card-title">Phone: {mobile_number}</div>
        <p className="card-text">Time: {reservation_time}</p>
        <p className="card-text">Guests: {people}</p>
      </div>
    </div>
  );
};

export default ReservationCard;
