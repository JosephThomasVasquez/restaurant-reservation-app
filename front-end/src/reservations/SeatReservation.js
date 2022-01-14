import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listTables } from "../utils/api";

const SeatReservation = ({ errorHandler }) => {
  const history = useHistory();

  const location = useLocation();
  console.log(location);

  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setErrors);
    return () => abortController.abort();
  }

  const mapTables = tables.map((table) => (
    <option key={table.table_id} value={table.table_name}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Seat</h1>
        </div>
      </div>
      <select class="custom-select">
        <option selected>Select a table:</option>
        {mapTables}
      </select>
    </div>
  );
};

export default SeatReservation;
