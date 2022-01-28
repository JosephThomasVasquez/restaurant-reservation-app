import React from "react";
import ReservationCard from "./ReservationCard";

const ReservationList = ({ reservations, errorHandler }) => {
  const mapReservations = reservations.map((reservation) => (
    <ReservationCard
      key={reservation.reservation_id}
      reservation={reservation}
      errorHandler={errorHandler}
    />
  ));

  return (
    <div className="container-fluid">
      <div className="row">{mapReservations}</div>
    </div>
  );
};

export default ReservationList;
