import React, { useState } from "react";
import { deleteTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const TablesList = ({ tables, errorHandler }) => {
  const [finishTable, setFinishTable] = useState(null);

  const handleFinishTable = async (table_id) => {
    console.log("table_id", table_id);

    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      try {
        const abortController = new AbortController();

        await deleteTable(table_id, abortController.abort());

        errorHandler(null);
      } catch (error) {
        console.log(error);
        // setTableError(error);
        error && errorHandler(error);
      }
    }
  };

  const mapTables = tables.map((table) => (
    <div
      className={
        table.reservation_id
          ? "row p-0 m-0 py-3 table-item-occupied d-flex align-items-center"
          : "row p-0 m-0 py-3 table-item"
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
            onClick={() => handleFinishTable(table.table_id)}
          >
            Finish
          </button>
        </div>
      )}
    </div>
  ));

  return (
    <div className="container mt-3 shadow table-list-bg">
      <div className="row">
        <div className="tables-header">
          <div className="text-center font-weight-bold">Tables</div>
        </div>
      </div>
      <div className="row">
        <div className=" w-100">{mapTables}</div>
      </div>
    </div>
  );
};

export default TablesList;
