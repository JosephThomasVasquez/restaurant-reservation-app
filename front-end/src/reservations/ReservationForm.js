import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

const ReservationForm = ({ error }) => {
  const history = useHistory();

  const today = new Date().toISOString().split("T")[0];
  console.log(today);
  const initialFormFData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: today,
    reservation_time: "12:00",
  };

  const [reservation, setReservation] = useState(initialFormFData);

  const handleChange = ({ target }) => {
    setReservation({ ...reservation, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitReservation = async () => {
      const abortController = new AbortController();

      try {
        //   Send a POST request of the reservation to the backend
        const response = await createReservation(
          reservation,
          abortController.abort()
        );

        console.log("response", response);
        setReservation(response);
      } catch (error) {}
    };

    submitReservation();
  };

  const handleCancel = () => {
    history.goBack();
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
              value={reservation?.first_name}
              required
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
              value={reservation?.last_name}
              required
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
              value={reservation?.mobile_number}
              required
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
              value={reservation?.people}
              required
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
              value={reservation?.reservation_date}
              required
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
              value={reservation?.reservation_time}
              required
            />
          </div>
        </div>

        <div className="row my-2">
          <div className="col-1">
            <button className="btn btn-primary form-control">Submit</button>
          </div>
          <div className="col-1">
            <button
              className="btn btn-danger form-control"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>{JSON.stringify(reservation)}</div>
    </div>
  );
};

export default ReservationForm;
