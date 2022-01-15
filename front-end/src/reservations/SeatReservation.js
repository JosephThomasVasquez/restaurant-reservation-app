import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";

const SeatReservation = ({ errorHandler }) => {
  const history = useHistory();

  const location = useLocation();
  const { people, reservation_id } = location.state.reservation;

  const initialFormData = {
    tableId: "",
    reservationId: reservation_id,
  };

  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState(null);
  const [seat, setSeat] = useState({ ...initialFormData });

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setErrors);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setSeat({ ...seat, tableId: Number(target.value) });
  };

  const mapTables = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  const handleSubmit = (e) => {
    console.log("tables", tables);
    console.log("seat", seat);
    console.log("location", location);
    e.preventDefault();

    const submitSeatReservation = async () => {
      const abortController = new AbortController();
      //   errorHandler();

      try {
        //   Send a PUT request of the tableId and reservationId to the backend
        await updateTable(
          seat.tableId,
          seat.reservationId,
          abortController.abort()
        );

        history.push(`/dashboard`);

        errorHandler(null);
      } catch (error) {
        console.log(error);
        error && errorHandler(error);
      }
    };

    submitSeatReservation();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Seat Reservation</h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h3>
            Seat <span className="capacity-count">{people}</span>{" "}
            {people === 1 ? "guest." : "guests."}
          </h3>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col text-center">Table Name - Table Capacity</div>
        </div>
        <div className="row">
          <div className="col text-center">
            <select
              className="form-control custom-select selectpicker show-tick w-25"
              onChange={handleChange}
              required
            >
              <option value="">Select a Table:</option>
              {mapTables}
            </select>
          </div>
        </div>
        <div className="row justify-content-md-center my-2">
          <div className="col-1">
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </div>
          <div className="col-1">
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

export default SeatReservation;
