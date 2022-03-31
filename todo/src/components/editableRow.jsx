import React from "react";

const EditableRow = ({
  el,
  handleDelete,
  handleEditChange,
  handleEditSubmit,
}) => (
  <tr key={el.id}>
    <td>
      <input
        type="text"
        name="title"
        value={el.title}
        onChange={handleEditChange}
        className="form-control "
      />
    </td>
    <td>
      <input
        type="date"
        name="date"
        value={el.date}
        onChange={handleEditChange}
        className="form-control "
      />
    </td>
    <td>
      <input
        type="time"
        name="time"
        value={el.time}
        onChange={handleEditChange}
        className="form-control "
      />
    </td>
    <td>
      <input type="checkbox" defaultChecked={el.status} />
      {el.status ? "Completed" : "Incomplete"}
    </td>
    <td>
      <button
        className="btn btn-warning btn-sm m-1"
        type="submit"
        onClick={handleEditSubmit}
      >
        Save
      </button>
      <button
        className="btn btn-danger btn-sm m-1"
        onClick={() => {
          handleDelete(el.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default EditableRow;
