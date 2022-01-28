import React from "react";

const BusinessHoursInfo = () => {
  const businessHours = {
    openHours: "10:30am",
    closedHours: "10:30pm",
    openDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  };
  // console.log(businessHours);

  return (
    <div className="business-hours-container p-2 mb-5">
      <div className="row">
        <h4 className="col-12 text-center">Business Hours</h4>
      </div>
      <div className="row">
        <div className="col text-thin text-center">
          <i>Reservations cannot be made after 9:30pm</i>
        </div>
      </div>

      <div className="row">
        <div className="list-day col-6 my-1 text-right">Monday:</div>
        <div className="list-time col-6 my-1 text-left">
          {businessHours.openHours} - {businessHours.closedHours}
        </div>
      </div>
      <div className="row">
        <div className="list-day col-6 my-1 text-right">Tuesday:</div>
        <div className="list-day-closed col-6 my-1 text-left">Closed</div>
      </div>
      <div className="row">
        <div className="list-day col-6 my-1 text-right">Wednesday:</div>
        <div className="list-time col-6 my-1 text-left text-left">
          {businessHours.openHours} - {businessHours.closedHours}
        </div>
      </div>
      <div className="row">
        <div className="list-day col-6 my-1 text-right">Thursday:</div>
        <div className="list-time col-6 my-1 text-left">
          {businessHours.openHours} - {businessHours.closedHours}
        </div>
      </div>
      <div className="row">
        <div className="list-day col-6 my-1 text-right">Friday:</div>
        <div className="list-time col-6 my-1 text-left">
          {businessHours.openHours} - {businessHours.closedHours}
        </div>
      </div>
      <div className="row">
        <div className="list-day col-6 my-1 text-right">Saturday:</div>
        <div className="list-time col-6 my-1 text-left">
          {businessHours.openHours} - {businessHours.closedHours}
        </div>
      </div>
      <div className="row">
        <div className="list-day col-6 my-1 text-right">Sunday:</div>
        <div className="list-time col-6 my-1 text-left">
          {businessHours.openHours} - {businessHours.closedHours}
        </div>
      </div>
    </div>
  );
};

export default BusinessHoursInfo;
