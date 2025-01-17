import React, { useState, useEffect } from "react";
import { listReservations, resetTable } from "../utils/api";
import { useHistory } from "react-router-dom";

const TablesList = ({ tables, errorHandler }) => {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    listReservations(abortController.signal)
      .then(setReservations)
      .catch((error) => {
        errorHandler(error);
      });

    return () => abortController.abort();
  }, []);

  const handleFinishTable = async (table) => {
    // Find the matching reservation_id from the returned reservations list
    const matchReservation = reservations.find(
      (reservation) => reservation.reservation_id === table.reservation_id
    );

    // User confirmation before resetting the table reservation_id to null
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      try {
        const abortController = new AbortController();

        await resetTable(
          table.table_id,
          matchReservation.reservation_id,
          abortController.abort()
        );

        errorHandler(null);
        history.go();
      } catch (error) {
        error && errorHandler(error);
      }
    }
  };

  // Conditional mapping of table elements based on if table is "free" or "occupied"
  const mapTables = tables.map((table) => (
    <div
      className={
        table.reservation_id
          ? "row p-0 m-0 py-1 table-item-occupied d-flex align-items-center"
          : "row p-0 m-0 py-1 table-item"
      }
      key={table.table_id}
    >
      <div className="col-4">{table.table_name}:</div>
      <div className="col-1">{table.capacity}</div>
      <div className="col-3 " data-table-id-status={`${table.table_id}`}>
        {table.reservation_id ? (
          <span className="table-occupied">Occupied</span>
        ) : (
          <span className="table-free my-5">Free</span>
        )}
      </div>
      {table.reservation_id && (
        <div className="col-3">
          <button
            className="btn btn-outline-danger btn-sm"
            data-table-id-finish={table.table_id}
            onClick={() => handleFinishTable(table)}
          >
            Finish
          </button>
        </div>
      )}
    </div>
  ));

  return (
    <div className="container-fluid mt-3 shadow table-list-bg">
      <div className="row">
        <div className="tables-header">
          <div className="text-center font-weight-bold">Tables</div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex flex-column w-100">{mapTables}</div>
      </div>
    </div>
  );
};

export default TablesList;
