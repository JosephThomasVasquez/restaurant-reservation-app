import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const TablesForm = () => {
  const history = useHistory();

  const initialFormData = {
    table_name: "",
    capacity: "",
  };

  const [table, setTable] = useState(initialFormData);

  const handleChange = ({ target }) => {
    setTable({ ...table, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitTable = async () => {};

    submitTable();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Create Table</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-3 mb-3">
            <label htmlFor="table_name" className="form-label">
              Table Name
            </label>

            <input
              type="text"
              name="table_name"
              id="table_name"
              placeholder="Table name"
              min="2"
              className="form-control"
              onChange={handleChange}
              value={table?.table_name}
            />
          </div>

          <div className="col-3 mb-3">
            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="text"
              name="capacity"
              id="capacity"
              placeholder="Capacity"
              min="1"
              className="form-control"
              onChange={handleChange}
              value={table?.capacity}
            />
          </div>
        </div>

        <div className="row my-2">
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
      <div>{JSON.stringify(table)}</div>
    </div>
  );
};

export default TablesForm;
