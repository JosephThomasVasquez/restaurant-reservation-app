import React, { useState } from "react";
import { createReservation } from "../utils/api";

const ReservationForm = () => {
  const [reservation, setReservation] = useState({});

  const handleChange = ({ target }) => {
    setReservation({ ...reservation, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createReservation(reservation);

    console.log(response);
    setReservation(response);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h2>Create Reservation</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-3">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>

            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First name"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-3">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last name"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <label htmlFor="mobile_number" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile_number"
              id="mobile_number"
              placeholder="(123)-456-7890"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-3">
            <label htmlFor="people" className="form-label">
              Number of Guests
            </label>
            <input
              type="number"
              min="1"
              max="100"
              name="people"
              id="people"
              placeholder="1"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <label htmlFor="reservation_date" className="form-label">
              Reservation Date
            </label>
            <input
              type="date"
              name="reservation_date"
              id="reservation_date"
              placeholder="MM/DD/YYYY"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-3">
            <label htmlFor="reservation_time" className="form-label">
              Reservation Time
            </label>
            <input
              type="time"
              name="reservation_time"
              id="reservation_time"
              placeholder="12:00"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row my-2">
          <div className="col-1">
            <button className="btn btn-primary form-control">Submit</button>
          </div>
          <div className="col-1">
            <button className="btn btn-danger form-control">Cancel</button>
          </div>
        </div>
      </form>
      <div>{JSON.stringify(reservation)}</div>
    </div>
  );
};

export default ReservationForm;
