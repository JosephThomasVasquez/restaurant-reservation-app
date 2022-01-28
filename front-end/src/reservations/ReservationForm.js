import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  readReservation,
  createReservation,
  updateReservation,
} from "../utils/api";
import BusinessHoursInfo from "../layout/businessHours/BusinessHoursInfo";

const ReservationForm = ({ errorHandler }) => {
  const history = useHistory();
  const location = useLocation();
  const reservationData = location.state?.reservation;

  //   Set today's date as a default value for reservation state in the correct format yyyy/mm/dd
  const today = new Date().toISOString().split("T")[0];

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: today,
    reservation_time: "12:00",
  };

  const [reservation, setReservation] = useState(initialFormData);

  useEffect(() => {
    const abortController = new AbortController();

    const getReservation = async () => {
      try {
        const response = await readReservation(
          reservationData.reservation_id,
          abortController.signal
        );

        if (response) {
          let formatDate = response.reservation_date.split("T")[0];
          setReservation({ ...response, reservation_date: formatDate });
        } else {
          setReservation(initialFormData);
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    if (reservationData) {
      getReservation();
    }

    return () => abortController.abort();
  }, [reservationData]);

  const handleChange = ({ target }) => {
    // Make sure the people value is a number
    if (target.name === "people") {
      setReservation({ ...reservation, [target.name]: Number(target.value) });
      console.log(reservation.reservation_date);
    } else {
      setReservation({ ...reservation, [target.name]: target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitReservation = async () => {
      const abortController = new AbortController();
      //   errorHandler();

      try {
        if (reservationData) {
          //   Send a POST request of the reservation to the backend
          const response = await updateReservation(
            reservation,
            abortController.abort()
          );

          setReservation(response);
          // console.log("reservation:", reservation);
          history.push(`/dashboard?=${reservation.reservation_date}`);
          errorHandler(null);
        } else {
          //   Send a POST request of the reservation to the backend
          const response = await createReservation(
            reservation,
            abortController.abort()
          );

          setReservation(response);
          // console.log("reservation:", reservation);
          history.push(`/dashboard?=${reservation.reservation_date}`);
          errorHandler(null);
        }
      } catch (error) {
        console.log(error);
        error && errorHandler(error);
        // console.log("error:", error);
      }
    };

    submitReservation();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 text-center">
          {reservationData ? (
            <h1>Edit Reservation</h1>
          ) : (
            <h1>Create Reservation</h1>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-md-8 col-sm-12 m-auto">
          <BusinessHoursInfo />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-4 col-lg-4 mb-3">
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
            />
          </div>

          <div className="col-md-4 col-lg-4 mb-3">
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
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-md-4 col-lg-4 mb-3">
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
            />
          </div>

          <div className="col-md-4 col-lg-4 mb-3">
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
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-md-4 col-lg-4 mb-3">
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
            />
          </div>

          <div className="col-md-4 col-lg-4 mb-3">
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
            />
          </div>
        </div>

        <div className="row my-2 d-flex justify-content-center">
          <div className="col-lg-2 col-md-2 col-sm col-6 col">
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </div>
          <div className="col-lg-2 col-md-2 col-sm col-6 col">
            <button
              type="button"
              className="btn btn-secondary form-control"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
