import React from "react";

const TablesList = ({ tables }) => {
  const mapTables = tables.map((table) => (
    <div
      className={
        table.reservation_id
          ? "row p-0 m-0 py-3 table-item-occupied"
          : "row p-0 m-0 py-3 table-item"
      }
      key={table.table_id}
    >
      <div className="col-5">{table.table_name}:</div>
      <div className="col-2">{table.capacity}</div>
      <div className="col-5" data-table-id-status={`${table.table_id}`}>
        {table.reservation_id ? (
          <span className="table-occupied">Occupied</span>
        ) : (
          <span className="table-free">Free</span>
        )}
      </div>
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
