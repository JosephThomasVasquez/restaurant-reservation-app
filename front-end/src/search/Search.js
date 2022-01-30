import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ReservationList from "../reservations/ReservationList";

const Search = ({ errorHandler }) => {
  const history = useHistory();

  const [searchNumber, setSearchNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [noReservations, setNoReservations] = useState(true);

  const handleChange = ({ target }) => {
    setSearchNumber(target.value);
    history.push(`/search?mobile_number=${target.value}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();

    try {
      // Sends a GET request to the backend matching partial mobile_number numbers
      const response = await listReservations(
        { mobile_number: searchNumber },
        abortController.signal
      );
      setReservations(response);
      setSearchNumber("");
      setNoReservations(false);
    } catch (error) {
      errorHandler(error);
    }

    return () => abortController.abort();
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 text-center">
          <h1>Search</h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">Search by phone number</div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-3 pr-0 mt-3">
          <input
            type="tel"
            name="mobile_number"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            min="2"
            className="form-control"
            value={searchNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-lg-1 col-md-2 col-sm-2 px-0 mt-3">
          <button
            type="button"
            className="btn btn-primary form-control"
            onClick={handleSearch}
          >
            Find
          </button>
        </div>
        <div className="col-12 text-center">
          {reservations.length > 0 ? (
            <ReservationList reservations={reservations} />
          ) : !noReservations && reservations.length === 0 ? (
            <div className="h3 mt-5">No reservations found</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
