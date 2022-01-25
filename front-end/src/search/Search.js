import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { searchReservation } from "../utils/api";

const Search = ({ errorHandler }) => {
  const history = useHistory();
  console.log("history", history);

  const [searchNumber, setSearchNumber] = useState("");

  const handleChange = ({ target }) => {
    setSearchNumber(target.value);

    history.push(`/search?mobile_number=${target.value}`);
  };

  const handleSearch = () => {
    console.log(searchNumber);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Search</h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">Search by phone number</div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-3 pr-0">
          <input
            type="tel"
            name="mobile_number"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            min="2"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-1 pl-0">
          <button
            type="button"
            className="btn btn-primary form-control w-75"
            onClick={handleSearch}
          >
            Find
          </button>
        </div>
      </div>
      {JSON.stringify(searchNumber)}
    </div>
  );
};

export default Search;
