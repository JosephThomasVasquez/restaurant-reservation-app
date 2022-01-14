import React from "react";

const TablesList = ({ tables }) => {
  const mapTables = tables.map((table) => (
    <div className="row p-0 m-0 py-3 table-item" key={table.table_id}>
      <div className="col-5">{table.table_name}:</div>
      <div className="col-2">{table.capacity}</div>
      <div className="col-5 table-status">Occupied</div>
    </div>
  ));
  return (
    <div className="container mt-3 shadow-lg">
      <div className="row">
        <div className="mr-3 tables-header">
          <div className="text-center font-weight-bold">Tables</div>
        </div>
      </div>
      <div className="row">
        <div className="mr-3 w-100">{mapTables}</div>
      </div>
    </div>
  );
};

export default TablesList;
