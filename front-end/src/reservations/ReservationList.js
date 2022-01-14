import React from "react";
import ReservationCard from "./ReservationCard";

const ReservationList = ({ reservations }) => {
  const mapReservations = reservations.map((reservation) => (
    <ReservationCard
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ));

  return (
    <div className="container-fluid">
      <div className="row">{mapReservations}</div>
    </div>
  );
};

export default ReservationList;
