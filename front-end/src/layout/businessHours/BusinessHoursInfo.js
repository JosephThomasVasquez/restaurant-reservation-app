import React from "react";

const BusinessHoursInfo = () => {
  return (
    <div className="business-hours-container col-6 p-2 mb-5">
      <div className="row">
        <h4 className="col">Business Hours</h4>
      </div>
      <div className="row">
        <div className="col text-thin">
          <i>Reservations cannot be made after 9:30pm</i>
        </div>
      </div>

      <div className="row">
        <div className="list-day col-2 my-1">Monday:</div>
        <div className="list-time col-3 my-1">10:30am - 10:30pm</div>
      </div>
      <div className="row">
        <div className="list-day col-2 my-1">Tuesday:</div>
        <div className="list-day-closed col-3 my-1">Closed</div>
      </div>
      <div className="row">
        <div className="list-day col-2 my-1">Wednesday:</div>
        <div className="list-time col-3 my-1">10:30am - 10:30pm</div>
      </div>
      <div className="row">
        <div className="list-day col-2 my-1">Thursday:</div>
        <div className="list-time col-3 my-1">10:30am - 10:30pm</div>
      </div>
      <div className="row">
        <div className="list-day col-2 my-1">Friday:</div>
        <div className="list-time col-3 my-1">10:30am - 10:30pm</div>
      </div>
      <div className="row">
        <div className="list-day col-2 my-1">Saturday:</div>
        <div className="list-time col-3 my-1">10:30am - 10:30pm</div>
      </div>
      <div className="row">
        <div className="list-day col-2 my-1">Sunday:</div>
        <div className="list-time col-3 my-1">10:30am - 10:30pm</div>
      </div>
    </div>
  );
};

export default BusinessHoursInfo;
